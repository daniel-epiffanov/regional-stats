import { ApolloServer } from "apollo-server-express"
import { StatMainSectionNames } from "../../../../../../sharedTypes/gqlQueries"

type Props = Readonly<{
	testServer: ApolloServer
}>

const getStatisticsAllMainSectionNames = async (props: Props) => {
	const { testServer } = props

	const response = await testServer.executeOperation({
		query: `query { statisticsAllMainSectionNames { name } }`
	})

	const statisticsAllMainSectionNames: StatMainSectionNames = response.data?.statisticsAllMainSectionNames

	if (!statisticsAllMainSectionNames) throw new Error('statisticsMainSectionNames is falsy')

	return statisticsAllMainSectionNames
}

export default getStatisticsAllMainSectionNames