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
	// selectedRegionName: MongoStatisticsOfRegion['regionName'],
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
		// selectedRegionName: statRegionNames[0],
		// curMainSectionName: statMainSectionNames[0].name,
		// curSubSectionName: '',
		// selectedYearOnMap: statYears[0],
		curStatData: null,
		curRegionTypeOnMap: 'region',
	})

	const setCurValues: SetCurValues = (newSelections) => {
		setCurValuesAcc(prevSelectionParams => ({ ...prevSelectionParams, ...newSelections }))
	}
	
	// const {loading, error, data} = useSubSectionData(statMainSectionNames[0].name)

	// useEffect(() => {
	// 	if(data) {
	// 		setCurValuesAcc({...curValuesAcc, curSubSectionName: data.statSubSectionNames[0].name})
	// 	}
	// }, [data])
	

	// if(error) return <Message text="loading subsections error" type="error" />
	// if(loading || !data || !curValuesAcc.curSubSectionName) return <Message text="loading subsections" type="message" />

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
