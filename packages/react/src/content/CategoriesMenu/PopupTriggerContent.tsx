import { useCurValuesContext } from "../../context/CurValuesContext"

// @ts-ignore
const PopupTriggerContent: FC = () => {
	const { curMenuVals } = useCurValuesContext()

	if(curMenuVals.length === 0) return <p>statistics categories</p>

	return curMenuVals.map((curMenuVal, i) => {
		const isLastElement = curMenuVals.length === (i + 1)
		return (
			<>
				<p>{curMenuVal}</p>
				{!isLastElement && <i className="dx-icon-chevronright"/>}
			</>
		)
	})
}

export default PopupTriggerContent