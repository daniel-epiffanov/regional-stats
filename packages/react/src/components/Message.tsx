import { FC, useEffect } from 'react'
import { LoadPanel } from 'devextreme-react/load-panel'

interface Props {
	text: string,
	type: 'error' | 'message'
}

const RELOAD_TIMEOUT_MSCDS = 20 * 1000
const RELOAD_TIMEOUT_SCNDS = RELOAD_TIMEOUT_MSCDS / 1000

const Message: FC<Props> = ({ text, type }) => {
	useEffect(() => {
		if (type !== 'error') return
		setTimeout(() => {
			window.location.reload()
		}, RELOAD_TIMEOUT_MSCDS)
	}, [type])

	if (type === 'message') {
		return (
			<div style={{ position: 'relative' }}>
				<span>{text} Please, wait...</span>
				<LoadPanel visible />
			</div>
		)
	}

	return (
		<span>
			<strong>
				{text} <em>We will reload the page in {RELOAD_TIMEOUT_SCNDS} seconds.</em>
			</strong>
		</span>
	)
}

export default Message
