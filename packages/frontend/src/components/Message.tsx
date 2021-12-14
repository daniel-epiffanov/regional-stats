// import { Toast } from 'devextreme-react/toast'
import { FC, useEffect } from 'react'
import styles from './styles/Message.module.scss'

interface Props {
	message: string,
	type?: 'error' | 'msg'
}

const RELOAD_TIMEOUT_MSCDS = 20 * 1000
const RELOAD_TIMEOUT_SCNDS = RELOAD_TIMEOUT_MSCDS / 1000

const Message: FC<Props> = ({ message, type }) => {
	useEffect(() => {
		if (type !== 'error') return
		setTimeout(() => {
			window.location.reload()
		}, RELOAD_TIMEOUT_MSCDS)
	}, [type])

	return (
		<div className={styles.root}>
			<p>{message}</p>
			{type === 'error' && (
				<p>
					Страница перезагрузится через
					{' '}
					{RELOAD_TIMEOUT_SCNDS}
					{' '}
					секунд...
				</p>
			)}
		</div>
	)
}

Message.defaultProps = {
	type: 'msg',
}
// <Toast
// 	visible
// 	message={displayMessage}
// 	type="error"
// 	displayTime={RELOAD_TIMEOUT_MSCDS * 2}
// />

export default Message
