import { useEffect, useState } from 'react'
import { StatAnyCategories } from '../../../../../../sharedTypes/gqlQueries'
import fetchSubCategories from '../queries/fetchSubCategories'

type UseWatchSubCategories = (mainCategory: string) => StatAnyCategories | null


const useFetchStatSubCategories: UseWatchSubCategories = (mainCategory) => {

	const [statSubCategories, setStatSubCategories] = useState<StatAnyCategories | null>(null)


	useEffect(() => {
		const fetchAndSaveSubCategories = async () => {
			if(!mainCategory) return
			const subCategories = await fetchSubCategories(mainCategory)
			if(!subCategories) return
			setStatSubCategories(subCategories)
		}
		
		fetchAndSaveSubCategories()
	}, [mainCategory])
	



	return statSubCategories
}

export default useFetchStatSubCategories
