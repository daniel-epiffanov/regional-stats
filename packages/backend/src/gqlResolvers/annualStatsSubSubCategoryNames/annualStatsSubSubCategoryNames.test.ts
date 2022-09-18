import { ApolloServer } from 'apollo-server-express';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { Connection } from 'mongoose';
import { GqlAnnualStatsCategoryNames } from '../../../../../sharedTypes/gqlQueries';
import connectToMongo from '../../services/connectToMongo';
import { getNewApolloServer } from '../../services/startApollo';

describe('gql annualStatsSubSubCategoryNames query', () => {
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
          annualStatsSubSubCategoryNames: {
            __args: {
              mainCategoryName: 'Население',
              subCategoryName: 'Распределение числа выбывших по направлениям передвижения',
            },
          },
        },
      }),
    });

    const annualStatsSubSubCategoryNames: GqlAnnualStatsCategoryNames = response
      .data?.annualStatsSubSubCategoryNames;

    expect(annualStatsSubSubCategoryNames.length).toBeGreaterThan(0);

    annualStatsSubSubCategoryNames.forEach((annualStatsSubSubCategoryName) => {
      expect(typeof annualStatsSubSubCategoryName === 'string').toBe(true);
      expect(annualStatsSubSubCategoryName.length).toBeGreaterThan(0);
    });
  });
});
