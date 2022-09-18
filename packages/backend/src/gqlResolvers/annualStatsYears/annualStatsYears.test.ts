import { ApolloServer } from 'apollo-server-express';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { Connection } from 'mongoose';
import { GqlAnnualStatsYears } from '../../../../../sharedTypes/gqlQueries';
import connectToMongo from '../../services/connectToMongo';
import { getNewApolloServer } from '../../services/startApollo';

describe('gql annualStatsYears query', () => {
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
          annualStatsYears: true,
        },
      }),
    });

    const annualStatsYears: GqlAnnualStatsYears = response.data?.annualStatsYears;

    expect(annualStatsYears.length).toBeGreaterThan(0);

    annualStatsYears.forEach((year) => {
      expect(typeof year === 'number').toBe(true);
      expect(year.toString().length).toBe(4);
    });
  });
});
