import { ApolloServer } from "apollo-server-express"
import { StatMainSectionNames } from "../../../../../../sharedTypes/gqlQueries"

type Props = Readonly<{
	testServer: ApolloServer
}>

const getStatMainSectionNames = async (props: Props) => {
	const { testServer } = props

	const response = await testServer.executeOperation({
		query: `query { statMainSectionNames { name } }`
	})

	const statMainSectionNames: StatMainSectionNames = response.data?.statMainSectionNames

	if (!statMainSectionNames) throw new Error('statisticsMainSectionNames is falsy')

	return statMainSectionNames
}

export default getStatMainSectionNames