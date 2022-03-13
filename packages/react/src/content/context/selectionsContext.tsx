import {
	createContext, FC, useContext, useState,
} from 'react'
import {
	MongoMainSection,
	MongoRegionCoords,
	MongoStatisticsOfRegion,
	MongoSubSection,
	MongoStatisticsDataItem,
} from '../../../../../sharedTypes/mongoModels'
import { useGeneralDataContext } from '../../context/GeneralDataContext'

interface ContextValues {
	selectedRegionName: MongoStatisticsOfRegion['regionName'],
	selectedMainSectionName: MongoMainSection['name'],
	selectedSubSectionName: MongoSubSection['name'],

	selectedRegionTypeOnMap: MongoRegionCoords['type'],
	selectedYearOnMap: MongoStatisticsDataItem['year'],

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
