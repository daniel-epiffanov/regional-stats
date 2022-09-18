import { ApolloServer } from 'apollo-server-express';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { Connection } from 'mongoose';
import { GqlRegionNames } from '../../../../../sharedTypes/gqlQueries';
import connectToMongo from '../../services/connectToMongo';
import { getNewApolloServer } from '../../services/startApollo';
import CoordsOfRegionModel from '../../mongoModels/coordsOfRegion';
import AnnualStatsOfRegionModel from '../../mongoModels/annualStatsOfRegion';

describe('gql regionNames query', () => {
  let mongoConnection: Connection;
  let apolloServer: ApolloServer;

  beforeAll(async () => {
    mongoConnection = await connectToMongo();
    apolloServer = getNewApolloServer();
  });

  afterAll(async () => {
    await mongoConnection.close();
    await apolloServer.stop();
  });

  test('presence, type, format', async () => {
    const response = await apolloServer.executeOperation({
      query: jsonToGraphQLQuery({
        query: {
          regionNames: true,
        },
      }),
    });

    const regionNames: GqlRegionNames = response.data?.regionNames;

    expect(regionNames.length).toBeGreaterThan(0);

    regionNames.forEach((regionName) => {
      expect(typeof regionName === 'string').toBe(true);
      expect(regionName.length).toBeGreaterThan(0);
    });
  });

  test('regionType argument', async () => {
    const response = await apolloServer.executeOperation({
      query: jsonToGraphQLQuery({
        query: {
          regionNamesOfRegionType: {
            __aliasFor: 'regionNames',
            __args: {
              regionType: 'region',
            },
          },
          regionNamesOfFederalDistrictType: {
            __aliasFor: 'regionNames',
            __args: {
              regionType: 'federalDistrict',
            },
          },
        },
      }),
    });

    const regionNamesOfRegionType: GqlRegionNames = response
      .data?.regionNamesOfRegionType;
    const regionNamesOfFederalDistrictType: GqlRegionNames = response
      .data?.regionNamesOfFederalDistrictType;

    expect(regionNamesOfRegionType.length).toBeGreaterThan(0);
    expect(regionNamesOfFederalDistrictType.length).toBeGreaterThan(0);
    expect(regionNamesOfRegionType.length).toBeGreaterThan(regionNamesOfFederalDistrictType.length);
  });

  test('annualStatsRegionNames are the same as coordsRegionNames in db', async () => {
    const coordsRegionNames: GqlRegionNames = await CoordsOfRegionModel.distinct('regionName');
    const annualStatsRegionNames: GqlRegionNames = await AnnualStatsOfRegionModel.distinct('regionName');

    expect(coordsRegionNames.length === annualStatsRegionNames.length);

    coordsRegionNames.forEach(coordsRegionName => {
      expect(annualStatsRegionNames.includes(coordsRegionName)).toBe(true);
    });
  });
});
