import { Toast } from 'devextreme-react/toast'
import { FC, useEffect } from 'react'

interface Props {
	message: string
}

const RELOAD_TIMEOUT_MSCDS = 20 * 1000
const RELOAD_TIMEOUT_SCNDS = RELOAD_TIMEOUT_MSCDS / 1000

const Error: FC<Props> = ({ message }) => {
	useEffect(() => {
		setTimeout(() => {
			window.location.reload()
		}, RELOAD_TIMEOUT_MSCDS)
	}, [])

	const displayMessage = `${message} Страница перезагрузится через ${RELOAD_TIMEOUT_SCNDS} секунд...`

	return (
		<Toast
			visible
			message={displayMessage}
			type="error"
			displayTime={RELOAD_TIMEOUT_MSCDS * 2}
		/>
	)
}

export default Error
