import { useEffect, useState } from 'react'
import { StatMainCategories, StatAnyCategories } from '../../../../../../sharedTypes/gqlQueries'
import { usePrefetchedValuesContext } from '../../../context/PrefetchedValuesContext'
import fetchSubCategories from '../queries/fetchSubCategories'
import useFetchStatData from './useFetchStatData'
import useFetchStatSubCategories from './useFetchStatSubCategories'

export type CurCategories = Readonly<{
	categoriesChain: string[],
	isComplete: boolean,
}>


const useCategories = () => {
	const { statMainCategories } = usePrefetchedValuesContext()

	const [curCategories, setCurCategories] = useState<CurCategories>({
		categoriesChain: [],
		isComplete: false
	})

	useFetchStatData(curCategories)

	const subCategories = useFetchStatSubCategories(curCategories.categoriesChain[0])
	
	
	const changeMainCategory = async (newMainCategoryName: string) => {
		setCurCategories({ categoriesChain: [newMainCategoryName], isComplete: false })
	}

	const changeSubCategory = async (newSubCategoryName: string) => {
		if(!subCategories) return
		

		const newSubCategoryChildren = subCategories?.find(subCategory => subCategory.name === newSubCategoryName)?.children
		const doesHaveCHidlren = Array.isArray(newSubCategoryChildren) && newSubCategoryChildren.length > 0

		if(doesHaveCHidlren) return

		setCurCategories({
			categoriesChain: [curCategories.categoriesChain[0], newSubCategoryName],
			isComplete: false
		})
		// hidePopup()
	}


	return {
		mainCategoryNames: statMainCategories.map(statMainSectionName => statMainSectionName.name),
		changeMainCategory,

		subCategoryNames: subCategories?.map(subCategory => subCategory.name),
	}
}

export default useCategories
