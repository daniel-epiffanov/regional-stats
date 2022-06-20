import { FC, useEffect, useState } from 'react'
import { StatCategories } from '../../../../../sharedTypes/gqlQueries'
import { usePrefetchedValuesContext } from '../../context/PrefetchedValuesContext'
import { useCurValuesContext } from '../../context/CurValuesContext'
import List from '../../dxComponents/List'
import fetchStatData from './queries/fetchStatData'
import fetchStatSecondCategories from './queries/fetchStatSecondCategories'
import styles from './styles/Content.module.scss'
import useCategories from './hooks/useCategories'
import ListWithIcon from './ListWithArrowIcon'

type Props = Readonly<{
	hidePopup: () => void
}>



const PopupContent: FC<Props> = ({ hidePopup }) => {

	const {
		statFirstCategories,
		changeStatFirstCategory,
		statSecondCategories,
		changeStatSecondCategory,
		statThirdCategories,
		changeStaThirdCategory
	} = useCategories()

	if(!statFirstCategories) return null

	return (
		<div className={styles['root']}>
			<List	items={statFirstCategories} valueChangeHandler={changeStatFirstCategory}/>
			{statSecondCategories && <ListWithIcon items={statSecondCategories} valueChangeHandler={changeStatSecondCategory} />}
			{statThirdCategories && <ListWithIcon items={statThirdCategories} valueChangeHandler={changeStaThirdCategory} />}
		</div>
	)
}

export default PopupContent
