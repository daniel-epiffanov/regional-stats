import { FC, useEffect, useState } from 'react'
import { StatAnyCategories } from '../../../../../sharedTypes/gqlQueries'
import { usePrefetchedValuesContext } from '../../context/PrefetchedValuesContext'
import { useCurValuesContext } from '../../context/CurValuesContext'
import List from '../../dxComponents/List'
import fetchStatData from './queries/fetchStatData'
import fetchSubCategories from './queries/fetchSubCategories'
import styles from './styles/Content.module.scss'
import useCategories from './hooks/useCategories'
import ListWithIcon from './ListWithArrowIcon'

type Props = Readonly<{
	hidePopup: () => void
}>



const PopupContent: FC<Props> = ({ hidePopup }) => {

	const {
		mainCategoryNames,
		changeMainCategory,
		subCategoryNames
	} = useCategories()


	return (
		<div className={styles['root']}>
			<List	items={mainCategoryNames} valueChangeHandler={changeMainCategory}/>
			{subCategoryNames && <ListWithIcon items={subCategoryNames}/>}
		</div>
	)
}

export default PopupContent
