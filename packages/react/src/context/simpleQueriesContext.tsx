import { useQuery, gql } from '@apollo/client'
import {
	createContext, FC, useContext,
} from 'react'
import { MainSectionNamesResponse, RegionNamesResponse, YearsResponse } from '../../../../sharedTypes/gqlQueries'
import Message from '../components/Message'

interface ContextValues {
	regionNames: RegionNamesResponse,
	years: YearsResponse,
	mainSectionNames: MainSectionNamesResponse
}

type ReadonlyContextValues = Readonly<ContextValues>

const QUERY = gql` query {
	regionNames, years, mainSectionNames
}`

const SimpleQueriesContext = createContext<ReadonlyContextValues>({} as ReadonlyContextValues)

export const useSimpleQueriesContext = () => useContext(SimpleQueriesContext)

export const SimpleQueriesProvider: FC = ({ children }) => {
	const { loading, error, data: simpleQueriesData } = useQuery<ReadonlyContextValues>(QUERY)

	if (loading) return <Message type="message" text="We are fetching basic data." />

	if (error || !simpleQueriesData) return <Message type="error" text="Basic data was not fetched!" />

	return (
		<SimpleQueriesContext.Provider value={simpleQueriesData}>
			{children}
		</SimpleQueriesContext.Provider>
	)
}
