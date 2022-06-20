import { useEffect, useState } from 'react'
import { StatCategories } from '../../../../../../sharedTypes/gqlQueries'
import fetchStatFirstCategories from '../queries/fetchStatFirstCategories'

type UseFetchFirstCategories = () => StatCategories | null


const useFetchStatFirstCategories: UseFetchFirstCategories = () => {

	const [firstCategories, setFirstCategories] = useState<StatCategories | null>(null)


	useEffect(() => {
		const fetchAndSaveStatFirstCategories = async () => {
			const subCategories = await fetchStatFirstCategories()
			if(!subCategories) return
			setFirstCategories(subCategories)
		}
		
		fetchAndSaveStatFirstCategories()
	}, [])
	



	return firstCategories
}

export default useFetchStatFirstCategories
