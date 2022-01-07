import { useQuery, gql } from '@apollo/client'
import {
	createContext, FC, useContext,
} from 'react'
import { MainSectionNamesResponse, RegionNamesResponse, YearsResponse } from '../../../../sharedTypes/gqlQueries'

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

	if (loading) return <span>We are fetching data. Please, wait...</span>

	if (error || !simpleQueriesData) {
		return (
			<span>
				<strong>
					Error, data was not fetched!
					{' '}
					<em>Try to reload the page!</em>
				</strong>
			</span>
		)
	}

	return (
		<SimpleQueriesContext.Provider value={simpleQueriesData}>
			{children}
		</SimpleQueriesContext.Provider>
	)
}
