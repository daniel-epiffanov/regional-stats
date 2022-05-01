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
	// selectedRegionName: MongoStatisticsOfRegion['regionName'],
	selectedMainSectionName: MongoMainSection['name'],
	selectedSubSectionName: MongoSubSection['name'],
	selectedSubSectionChildName?: MongoSubSection['name'],

	selectedRegionTypeOnMap: MongoRegionCoords['type'],
	// selectedYearOnMap: MongoStatisticsDataItem['year'],

	selectionsHandler: SelectionsHandler,
}

type ReadonlyContextValues = Readonly<ContextValues>

type SelectionsHandler = (newSelections: Partial<ReadonlyStateValues>) => void

type ReadonlyStateValues = Omit<ReadonlyContextValues, 'selectionsHandler'>

const SelectionsContext = createContext<ReadonlyContextValues>({} as ReadonlyContextValues)

export const useSelectionsContext = () => useContext(SelectionsContext)

export const SelectionsProvider: FC = ({ children }) => {
	const { statMainSectionNames, statRegionNames, statYears } = useGeneralDataContext()

	const [selections, setSelections] = useState<ReadonlyStateValues>({
		// selectedRegionName: statRegionNames[0],
		selectedMainSectionName: statMainSectionNames[0].name,
		selectedSubSectionName: '',
		// selectedYearOnMap: statYears[0],
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
