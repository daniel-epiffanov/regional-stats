import { useState } from 'react'

export type SelectedRegionHandler = (newSelectedRegion: string) => void

const useSelectedRegion = () => {
	const [selectedRegion, setSelectedRegion] = useState<string>('')
	const selectedRegionHandler: SelectedRegionHandler = (
		newSelectedRegion,
	) => setSelectedRegion(newSelectedRegion)

	return { selectedRegion, setSelectedRegion, selectedRegionHandler }
}

export default useSelectedRegion
