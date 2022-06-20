import { useCurValuesContext } from "../../context/CurValuesContext"

// @ts-ignore
const PopupTriggerContent: FC = () => {
	const { curStatCategoriesChain } = useCurValuesContext()

	if(curStatCategoriesChain.length === 0) return <p>statistics categories</p>

	return curStatCategoriesChain.map((curStatCategory, i) => {
		const isLastElement = curStatCategoriesChain.length === (i + 1)
		return (
			<>
				<p>{curStatCategory}</p>
				{!isLastElement && <i className="dx-icon-chevronright"/>}
			</>
		)
	})
}

export default PopupTriggerContent