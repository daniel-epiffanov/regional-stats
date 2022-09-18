import { ApolloServer } from 'apollo-server-express';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { Connection } from 'mongoose';
import { GqlCoordsPolygons } from '../../../../../sharedTypes/gqlQueries';
import connectToMongo from '../../services/connectToMongo';
import { getNewApolloServer } from '../../services/startApollo';

describe('gql coordsPolygons query', () => {
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

  it('presence', async () => {
    const response = await apolloServer.executeOperation({
      query: jsonToGraphQLQuery({
        query: {
          coordsPolygons: {
            __args: {
              regionType: 'federalDistrict',
            },
            geometry: {
              type: true,
              coordinates: true,
            },
            properties: {
              regionName: true,
            },
          },
        },
      }),
    });

    expect(response.errors).toBeUndefined();

    const coordsPolygons: GqlCoordsPolygons = response.data?.coordsPolygons;
    expect(coordsPolygons.length).toBeGreaterThan(0);
    coordsPolygons.forEach((coordsPolygon) => {
      expect(coordsPolygon.geometry.coordinates).toBeTruthy();
      expect(coordsPolygon.properties.regionName).toBeTruthy();
    });
  });
});
