import { useEffect, useState } from 'react'
import { StatSubCategories } from '../../../../../../sharedTypes/gqlQueries'
import fetchSubCategories from '../queries/fetchSubCategories'

type UseWatchSubCategories = (mainCategory: string) => StatSubCategories | null


const useWatchSubCategories: UseWatchSubCategories = (mainCategory) => {

	const [statSubCategories, setStatSubCategories] = useState<StatSubCategories | null>(null)


	useEffect(() => {
		const fetchAndSaveSubCategories = async () => {
			if(!mainCategory) return
			const subCategories = await fetchSubCategories(mainCategory)
			if(!subCategories)
			setStatSubCategories(subCategories)
		}
		
		fetchAndSaveSubCategories()
	}, [mainCategory])
	



	return statSubCategories
}

export default useWatchSubCategories
