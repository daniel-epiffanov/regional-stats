import { ApolloServer } from "apollo-server-express"
import { StatisticsSubSectionNames } from "../../../../../../sharedTypes/gqlQueries"

type Props = Readonly<{
	testServer: ApolloServer
	mainSectionName: string,
}>

const getStatisticsSubSectionNames = async (props: Props) => {
	const { testServer, mainSectionName } = props

	const response = await testServer.executeOperation({
		query: `query { statisticsSubSectionNames(mainSectionName: "${mainSectionName}") { name, children { name } } }`
	})

	const statisticsSubSectionNames: StatisticsSubSectionNames = response.data?.statisticsSubSectionNames

	if (!statisticsSubSectionNames) throw new Error('statisticsMainSectionNames is falsy')

	return statisticsSubSectionNames
}

export default getStatisticsSubSectionNames