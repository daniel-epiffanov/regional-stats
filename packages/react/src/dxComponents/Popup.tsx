import { Popup as DxPopup, Position } from 'devextreme-react/popup';
import { FC } from 'react';

type Props = Readonly<{
	isVisible: boolean,
	popupTriggerId: string,
	hidingHandler: () => void,
	contentRenderHandler: () => JSX.Element
}>

const Popup: FC<Props> = (props) => {
	const {isVisible, hidingHandler, popupTriggerId, contentRenderHandler} = props
	return (
		<DxPopup
			visible={isVisible}
			contentRender={contentRenderHandler}
			onHiding={hidingHandler}
			closeOnOutsideClick
			maxWidth={850}
			dragEnabled={false}
			title="Выберите категорию"
			showCloseButton
			height="50vh"
			id="popup"
			data-testid="popup"
		>
			<Position
				at="left bottom"
				my="left top"
				of={popupTriggerId}
			/>
    </DxPopup>
	)
}

export default Popup