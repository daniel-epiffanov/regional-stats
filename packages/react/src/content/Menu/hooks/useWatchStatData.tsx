import { useEffect, useState } from 'react'
import { StatSubCategories } from '../../../../../../sharedTypes/gqlQueries'
import fetchSubCategories from '../queries/fetchSubCategories'
import fetchStatData from '../queries/fetchStatData'
import { CurCategories } from './useCategories'
import { usePrefetchedValuesContext } from '../../../context/PrefetchedValuesContext'
import { useCurValuesContext } from '../../../context/CurValuesContext'

type UseWatchStatData = (curCategories: CurCategories) => void

const useWatchStatData: UseWatchStatData = (curCategories) => {
		const { statRegionNames } = usePrefetchedValuesContext()
		const { setCurValues } = useCurValuesContext()

		useEffect(() => {
			const fetchAndSaveStatData = async () => {
				if(!curCategories.isComplete) return

				const curStatData = await fetchStatData({
					regionNames: statRegionNames,
					mainCategory: curCategories.categoriesChain[0],
					subCategory: curCategories.categoriesChain[1],
					subSubCategory: curCategories.categoriesChain[2] || undefined,
				})

				if(!curStatData) return
				setCurValues({ curStatData })
			}


		fetchAndSaveStatData()
	}, [curCategories.isComplete])
}

export default useWatchStatData
