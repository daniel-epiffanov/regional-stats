import {
	createContext, FC, useContext, useState,
} from 'react'
import {
	ReadonlyStatisticsOfMainSection,
	ReadonlyRegionCoords,
	ReadonlyStatisticsOfRegion,
	ReadonlyStatisticsOfSubSection,
	ReadonlyStatisticsData,
} from '../../../../../sharedTypes/mongoModels'
import { useGeneralDataContext } from '../../context/GeneralDataContext'

interface ContextValues {
	selectedRegionName: ReadonlyStatisticsOfRegion['regionName'],
	selectedMainSectionName: ReadonlyStatisticsOfMainSection['name'],
	selectedSubSectionName: ReadonlyStatisticsOfSubSection['name'],

	selectedRegionTypeOnMap: ReadonlyRegionCoords['type'],
	selectedYearOnMap: ReadonlyStatisticsData['year'],

	selectionsHandler: SelectionsHandler,
}

type ReadonlyContextValues = Readonly<ContextValues>

type SelectionsHandler = (newSelections: Partial<ReadonlyStateValues>) => void

type ReadonlyStateValues = Omit<ReadonlyContextValues, 'selectionsHandler'>

const SelectionsContext = createContext<ReadonlyContextValues>({} as ReadonlyContextValues)

export const useSelectionsContext = () => useContext(SelectionsContext)

export const SelectionsProvider: FC = ({ children }) => {
	const { statisticsMainSectionNames, statisticsRegionNames } = useGeneralDataContext()

	const [selections, setSelections] = useState<ReadonlyStateValues>({
		selectedRegionName: statisticsRegionNames[1],
		selectedMainSectionName: statisticsMainSectionNames[0],
		selectedSubSectionName: '',
		selectedYearOnMap: 2007,
		selectedRegionTypeOnMap: 'region',
	})

	const selectionsHandler: SelectionsHandler = (newSelections) => {
		setSelections(prevSelectionParams => ({ ...prevSelectionParams, ...newSelections }))
	}

	return (
		<SelectionsContext.Provider value={{
			...selections,
			selectionsHandler,
		}}
		>
			{children}
		</SelectionsContext.Provider>
	)
}
