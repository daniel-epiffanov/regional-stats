import {
	createContext, FC, useContext, useState,
} from 'react'
import { ReadonlyStatistics } from '../../../../../../sharedTypes/mongoModels'
import { useSimpleQueriesContext } from '../../../context/simpleQueriesContext'

interface ContextValues {
	selectedRegion: ReadonlyStatistics['regionName'],
	selectedMainSectionName: string,
	selectedSubSectionTitle: string
}

type ReadonlyContextValues = Readonly<ContextValues>

const SelectionParamsContext = createContext<ReadonlyContextValues>({} as ReadonlyContextValues)

export const useSelectionParamsContext = () => useContext(SelectionParamsContext)

export const SimpleQueriesProvider: FC = ({ children }) => {
	const { mainSectionNames, regionNames } = useSimpleQueriesContext()
	const [selectionParams, setSelectionParams] = useState<ContextValues>({
		selectedRegion: regionNames[0],
		selectedMainSectionName: mainSectionNames[0],
		selectedSubSectionTitle: null,
	})

	return (
		<SelectionParamsContext.Provider value={selectionParams}>
			{children}
		</SelectionParamsContext.Provider>
	)
}
