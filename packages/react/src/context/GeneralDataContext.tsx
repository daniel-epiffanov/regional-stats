import { useQuery, gql } from '@apollo/client'
import {
	createContext, FC, useContext,
} from 'react'
import { StatisticsMainSectionNames, StatisticsRegionNames, StatisticsYears } from '../../../../sharedTypes/gqlQueries'
import Message from '../components/Message'

type ContextValues = Readonly<{
	statisticsRegionNames: StatisticsRegionNames,
	statisticsYears: StatisticsYears,
	statisticsMainSectionNames: StatisticsMainSectionNames
}>

const QUERY = gql` query {
	statisticsRegionNames,
	statisticsYears,
	statisticsMainSectionNames
}`

const GeneralDataContext = createContext<ContextValues>({} as ContextValues)

export const useGeneralDataContext = () => useContext(GeneralDataContext)

export const GeneralDataProvider: FC = ({ children }) => {
	const { loading, error, data: generalData } = useQuery<ContextValues>(QUERY)

	if (loading) return <Message type="message" text="We are fetching general data." />

	if (error || !generalData) return <Message type="error" text="General data was not fetched!" />

	return (
		<GeneralDataContext.Provider value={generalData}>
			{children}
		</GeneralDataContext.Provider>
	)
}
