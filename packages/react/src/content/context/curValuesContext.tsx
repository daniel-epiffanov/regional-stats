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
	curMainSectionName: MongoMainSection['name'],
	curSubSectionName: MongoSubSection['name'],
	curSubSectionChildName?: MongoSubSection['name'],

	curRegionTypeOnMap: MongoRegionCoords['type'],
	// selectedYearOnMap: MongoStatisticsDataItem['year'],

	setCurValues: SetCurValues,
}

type ReadonlyContextValues = Readonly<ContextValues>

type SetCurValues = (newSelections: Partial<ReadonlyStateValues>) => void

type ReadonlyStateValues = Omit<ReadonlyContextValues, 'setCurValues'>

const SelectionsContext = createContext<ReadonlyContextValues>({} as ReadonlyContextValues)

export const useSelectionsContext = () => useContext(SelectionsContext)

export const SelectionsProvider: FC = ({ children }) => {
	const { statMainSectionNames, statRegionNames, statYears } = useGeneralDataContext()

	const [selections, setSelections] = useState<ReadonlyStateValues>({
		// selectedRegionName: statRegionNames[0],
		curMainSectionName: statMainSectionNames[0].name,
		curSubSectionName: '',
		// selectedYearOnMap: statYears[0],
		curRegionTypeOnMap: 'region',
	})

	const setCurValues: SetCurValues = (newSelections) => {
		setSelections(prevSelectionParams => ({ ...prevSelectionParams, ...newSelections }))
	}

	return (
		<SelectionsContext.Provider value={{
			...selections,
			setCurValues,
		}}
		>
			{children}
		</SelectionsContext.Provider>
	)
}
