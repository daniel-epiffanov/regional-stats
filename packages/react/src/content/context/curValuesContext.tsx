import {
	createContext, FC, useContext, useEffect, useState,
} from 'react'
import { StatData } from '../../../../../sharedTypes/gqlQueries'
import {
	MongoMainSection,
	MongoRegionCoords,
	MongoStatisticsOfRegion,
	MongoSubSection,
	MongoStatisticsDataItem,
} from '../../../../../sharedTypes/mongoModels'
import Message from '../../components/Message'
import { useGeneralDataContext } from '../../context/GeneralDataContext'

interface ContextValues {
	curRegions: string[],
	// curMainSectionName: MongoMainSection['name'],
	// curSubSectionName: MongoSubSection['name'],
	// curSubSectionChildName?: MongoSubSection['name'],
	curStatData?: Readonly<{
    [key: string]: StatData
}> | null,

	curRegionTypeOnMap: MongoRegionCoords['type'],
	// selectedYearOnMap: MongoStatisticsDataItem['year'],

	setCurValues: SetCurValues,
}

type ReadonlyContextValues = Readonly<ContextValues>

type SetCurValues = (newSelections: Partial<ReadonlyStateValues>) => void

type ReadonlyStateValues = Omit<ReadonlyContextValues, 'setCurValues'>

const CurValuesContext = createContext<ReadonlyContextValues>({} as ReadonlyContextValues)

export const useCurValuesContext = () => useContext(CurValuesContext)

export const CurValuesProvider: FC = ({ children }) => {
	// const { statMainSectionNames, statRegionNames, statYears } = useGeneralDataContext()

	
	const [curValuesAcc, setCurValuesAcc] = useState<ReadonlyStateValues>({
		curRegions: [],
		// curMainSectionName: statMainSectionNames[0].name,
		// curSubSectionName: '',
		// selectedYearOnMap: statYears[0],
		curStatData: null,
		curRegionTypeOnMap: 'region',
	})

	const setCurValues: SetCurValues = (newSelections) => {
		setCurValuesAcc(prevSelectionParams => ({ ...prevSelectionParams, ...newSelections }))
	}
	
	return (
		<CurValuesContext.Provider value={{
			...curValuesAcc,
			setCurValues,
		}}
		>
			{children}
		</CurValuesContext.Provider>
	)
}
