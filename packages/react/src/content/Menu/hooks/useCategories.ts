import { useEffect, useState } from 'react'
import { StatMainCategories, StatSubCategories } from '../../../../../../sharedTypes/gqlQueries'
import { usePrefetchedValuesContext } from '../../../context/PrefetchedValuesContext'
import fetchSubCategories from '../queries/fetchSubCategories'
import useWatchStatData from './useWatchStatData'
import useWatchSubCategories from './useWatchSubCategories'

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

	useWatchStatData(curCategories)

	const subCategories = useWatchSubCategories(curCategories.categoriesChain[0])
	
	
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
		mainCategoriesName: statMainCategories.map(statMainSectionName => statMainSectionName.name),
		changeMainCategory,

		subCategoriesName: subCategories?.map(subCategory => subCategory.name),
	}
}

export default useCategories
