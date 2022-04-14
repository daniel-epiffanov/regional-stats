import { ApolloServer } from "apollo-server-express"
import { StatSubSectionNames } from "../../../../../../sharedTypes/gqlQueries"

type Props = Readonly<{
	testServer: ApolloServer
	mainSectionName: string,
}>

const getStatSubSectionNames = async (props: Props) => {
	const { testServer, mainSectionName } = props

	const response = await testServer.executeOperation({
		query: `query { statSubSectionNames(mainSectionName: "${mainSectionName}") { name, children { name } } }`
	})

	const getSstatSubSectionNames: StatSubSectionNames = response.data?.statSubSectionNames

	if (!getSstatSubSectionNames) throw new Error('statisticsMainSectionNames is falsy')

	return getSstatSubSectionNames
}

export default getStatSubSectionNames