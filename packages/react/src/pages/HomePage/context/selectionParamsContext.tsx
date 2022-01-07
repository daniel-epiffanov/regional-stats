import {
	createContext, FC, useContext, useState,
} from 'react'
import { ReadonlyStatistics } from '../../../../../../sharedTypes/mongoModels'
import { useSimpleQueriesContext } from '../../../context/simpleQueriesContext'

type SelectionParamsHandler = (newSelectedValues: Partial<ReadonlyStateValues>) => void

interface ContextValues {
	selectedRegion: ReadonlyStatistics['regionName'],
	selectedMainSectionName: string,
	selectedSubSectionName: string,
	selectionParamsHandler: SelectionParamsHandler
}

type ReadonlyContextValues = Readonly<ContextValues>

type ReadonlyStateValues = Omit<ReadonlyContextValues, 'selectionParamsHandler'>

const SelectionParamsContext = createContext<ReadonlyContextValues>({} as ReadonlyContextValues)

export const useSelectionParamsContext = () => useContext(SelectionParamsContext)

export const SelectionParamsProvider: FC = ({ children }) => {
	const { mainSectionNames, regionNames } = useSimpleQueriesContext()

	const [selectionParams, setSelectionParams] = useState<ReadonlyStateValues>({
		selectedRegion: regionNames[1],
		selectedMainSectionName: '',
		selectedSubSectionName: '',
	})

	const selectionParamsHandler: SelectionParamsHandler = (newSelectedValues) => {
		setSelectionParams(prevSelectionParams => ({ ...prevSelectionParams, ...newSelectedValues }))
	}

	return (
		<SelectionParamsContext.Provider value={{ ...selectionParams, selectionParamsHandler }}>
			{children}
		</SelectionParamsContext.Provider>
	)
}
