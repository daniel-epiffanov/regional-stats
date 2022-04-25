import { useState } from 'react'

export type SelectedRegionHandler = (newSelectedRegion: string) => void

const useSelectedRegion = () => {
	// const [selectedRegionName, setSelectedRegion] = useState<string>('')
	// const selectedRegionHandler: SelectedRegionHandler = (
	// 	newSelectedRegion,
	// ) => setSelectedRegion(newSelectedRegion)

	// return { selectedRegionName, setSelectedRegion, selectedRegionHandler }
}

export default useSelectedRegion
