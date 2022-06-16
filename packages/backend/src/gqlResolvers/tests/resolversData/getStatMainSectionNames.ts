import { ApolloServer } from "apollo-server-express"
import { statMainCategories } from "../../../../../../sharedTypes/gqlQueries"

type Props = Readonly<{
	testServer: ApolloServer
}>

const getstatMainCategories = async (props: Props) => {
	const { testServer } = props

	const response = await testServer.executeOperation({
		query: `query { statMainCategories { name } }`
	})

	const statMainCategories: statMainCategories = response.data?.statMainCategories

	if (!statMainCategories) throw new Error('statisticsMainSectionNames is falsy')

	return statMainCategories
}

export default getstatMainCategories