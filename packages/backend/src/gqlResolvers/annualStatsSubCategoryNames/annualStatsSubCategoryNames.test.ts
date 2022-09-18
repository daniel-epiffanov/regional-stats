import { ApolloServer } from 'apollo-server-express';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { Connection } from 'mongoose';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import connectToMongo from '../../services/connectToMongo';
import { getNewApolloServer } from '../../services/startApollo';

describe('gql annualStatsSubCategoryNames query', () => {
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

  test('presence, type', async () => {
    const response = await apolloServer.executeOperation({
      query: jsonToGraphQLQuery({
        query: {
          annualStatsSubCategoryNames: {
            __args: {
              mainCategoryName: 'Население',
            },
          },
        },
      }),
    });

    const annualStatsSubCategoryNames: GqlAnnualStatsCategoryNames = response
      .data?.annualStatsSubCategoryNames;

    expect(annualStatsSubCategoryNames.length).toBeGreaterThan(0);

    annualStatsSubCategoryNames.forEach((statisticsMainSectionName) => {
      expect(typeof statisticsMainSectionName === 'string').toBe(true);
      expect(statisticsMainSectionName.length).toBeGreaterThan(0);
    });
  });
});
