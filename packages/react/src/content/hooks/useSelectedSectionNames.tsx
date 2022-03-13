import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'
import { StatisticsRegionNames, CoordsByRegionType } from '../../../../../sharedTypes/gqlQueries'

type QueryResponse = {
	coordsByRegionType: CoordsByRegionType,
	statisticsRegionNames: StatisticsRegionNames
}

interface SelectedSections {
	selectedMainSectionName: string,
	selectedSubSectionTitle: string
}

export type SelectedSectionNamesHandler = (
	selectedMainSectionName: string,
	selectedSubSectionTitle: string,
) => void

const DEFAULT_SELECTED_SECTIONS = {
	selectedMainSectionName: '',
	selectedSubSectionTitle: '',
}

const useSelectedSectionNames = () => {
	const [selectedSectionNames,
		setSelectedSectionNames] = useState<SelectedSections>(DEFAULT_SELECTED_SECTIONS)

	const selectedSectionNamesHandler: SelectedSectionNamesHandler = (
		selectedMainSectionName, selectedSubSectionTitle,
	) => {
		setSelectedSectionNames({
			selectedMainSectionName,
			selectedSubSectionTitle,
		})
	}

	return {
		selectedMainSectionName: selectedSectionNames.selectedMainSectionName,
		selectedSubSectionTitle: selectedSectionNames.selectedSubSectionTitle,
		selectedSectionNamesHandler,
	}
}

export default useSelectedSectionNames
