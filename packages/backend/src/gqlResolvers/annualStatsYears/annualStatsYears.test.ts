import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { GqlAnnualStatsYears } from '../../../../../sharedTypes/gqlQueries';
import connectToMongo from '../../services/connectToMongo';
import { getNewApolloServer } from '../../services/startApollo';

describe('gql annualStatsYears query', () => {
  let connection: any;

  beforeAll(async () => {
    connection = await connectToMongo();
  });

  afterAll(async () => {
    await connection.close();
  });

  test('presence, type, format', async () => {
    const testServer = getNewApolloServer();

    const response = await testServer.executeOperation({
      query: jsonToGraphQLQuery({
        query: {
          annualStatsYears: true,
        },
      }),
    });

    expect(response.errors).toBeUndefined();

    const annualStatsYears: GqlAnnualStatsYears | null = response.data?.annualStatsYears || null;

    if (!annualStatsYears) fail('annualStatsYears in response is falsy');

    expect(annualStatsYears.length).toBeGreaterThan(0);

    annualStatsYears.forEach((year) => {
      expect(typeof year === 'number').toBe(true);
      expect(year.toString().length).toBe(4);
    });
  });
});
