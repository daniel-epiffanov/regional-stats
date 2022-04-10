import { ApolloServer } from "apollo-server-express"
import { StatisticsMainSectionNames } from "../../../../../../sharedTypes/gqlQueries"

type Props = Readonly<{
	testServer: ApolloServer
	regionName: string
}>

const getStatisticsMainSectionNames = async (props: Props) => {
	const { regionName, testServer } = props

	const response = await testServer.executeOperation({
		query: `query { statisticsMainSectionNames(regionName: "${regionName}") { name } }`
	})

	const statisticsMainSectionNames: StatisticsMainSectionNames = response.data?.statisticsMainSectionNames

	if (!statisticsMainSectionNames) throw new Error('statisticsMainSectionNames is falsy')

	return statisticsMainSectionNames
}

export default getStatisticsMainSectionNames