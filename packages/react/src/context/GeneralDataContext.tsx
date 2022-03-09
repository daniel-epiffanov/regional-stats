import { useQuery, gql } from '@apollo/client'
import {
	createContext, FC, useContext,
} from 'react'
import { StatisticsMainSectionNamesResponse, StatisticsRegionNamesResponse, StatisticsYearsResponse } from '../../../../sharedTypes/gqlQueries'
import Message from '../components/Message'

type ContextValues = Readonly<{
	statisticsRegionNames: StatisticsRegionNamesResponse,
	statisticsYears: StatisticsYearsResponse,
	statisticsMainSectionNames: StatisticsMainSectionNamesResponse
}>

const QUERY = gql` query {
	statisticsRegionNames,
	statisticsYears,
	statisticsMainSectionNames
}`

const GeneralDataContext = createContext<ContextValues>({} as ContextValues)

export const useGeneralDataContext = () => useContext(GeneralDataContext)

export const GeneralDataProvider: FC = ({ children }) => {
	const { loading, error, data: simpleQueriesData } = useQuery<ContextValues>(QUERY)

	if (loading) return <Message type="message" text="We are fetching basic data." />

	if (error || !simpleQueriesData) return <Message type="error" text="Basic data was not fetched!" />

	return (
		<GeneralDataContext.Provider value={simpleQueriesData}>
			{children}
		</GeneralDataContext.Provider>
	)
}
