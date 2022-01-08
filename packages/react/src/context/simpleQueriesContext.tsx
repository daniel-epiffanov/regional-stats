import { useQuery, gql } from '@apollo/client'
import {
	createContext, FC, useContext,
} from 'react'
import { StatisticsMainSectionNamesResponse, StatisticsRegionNamesResponse, StatisticsYearsResponse } from '../../../../sharedTypes/gqlQueries'
import Message from '../components/Message'

interface ContextValues {
	statisticsRegionNames: StatisticsRegionNamesResponse,
	statisticsYears: StatisticsYearsResponse,
	statisticsMainSectionNames: StatisticsMainSectionNamesResponse
}

type ReadonlyContextValues = Readonly<ContextValues>

const QUERY = gql` query {
	statisticsRegionNames, statisticsYears, statisticsMainSectionNames
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
