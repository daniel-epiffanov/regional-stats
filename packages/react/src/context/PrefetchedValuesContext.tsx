import { useQuery, gql } from '@apollo/client'
import {
	createContext, FC, useContext,
} from 'react'
import { StatMainCategories, StatRegionNames, StatYears } from '../../../../sharedTypes/gqlQueries'
import Message from '../components/Message'

type ContextValues = Readonly<{
	statRegionNames: StatRegionNames,
	statYears: StatYears,
	statMainCategories: StatMainCategories
}>

const QUERY = gql` query {
	statRegionNames,
	statYears,
	statMainCategories {
		name
	}
}`

const PrefetchedValuesContext = createContext<ContextValues>({} as ContextValues)

export const usePrefetchedValuesContext = () => useContext(PrefetchedValuesContext)

export const PrefetchedValuesProvider: FC = ({ children }) => {
	const { loading, error, data: generalData } = useQuery<ContextValues>(QUERY)

	if (loading) return <Message type="message" text="We are fetching general data." />

	if (error || !generalData) return <Message type="error" text="General data was not fetched!" />

	return (
		<PrefetchedValuesContext.Provider value={generalData}>
			{children}
		</PrefetchedValuesContext.Provider>
	)
}
