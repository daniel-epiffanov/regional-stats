import { ApolloServer } from "apollo-server-express"
import { StatisticsRegionNames } from "../../../../../../sharedTypes/gqlQueries"

type Props = Readonly<{
	testServer: ApolloServer
}>

const getStatisticsRegionNames = async (props: Props) => {
	const { testServer } = props

	const response = await testServer.executeOperation({
		query: 'query { statisticsRegionNames }',
	})

	const statisticsRegionNames: StatisticsRegionNames | undefined = response.data?.statisticsRegionNames

	if (!statisticsRegionNames) throw new Error('statisticsRegionNames is falsy')

	return statisticsRegionNames
}

export default getStatisticsRegionNames