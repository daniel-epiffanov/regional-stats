import { Popup as DxPopup, Position } from 'devextreme-react/popup';
import { FC } from 'react';

type Props = Readonly<{
	isVisible: boolean,
	triggerId: string,
	hidingHandler: () => void,
	contentRenderHandler: () => JSX.Element
}>

const Popup: FC<Props> = (props) => {
	const {isVisible, hidingHandler, triggerId, contentRenderHandler} = props
	return (
		<DxPopup
			visible={isVisible}
			contentRender={contentRenderHandler}
			onHiding={hidingHandler}
			closeOnOutsideClick
			maxWidth={850}
			dragEnabled={false}
			title="Choose a category"
			showCloseButton
			height="50vh"
			data-testid="popup"
		>
			<Position
				at="left bottom"
				my="left top"
				of={triggerId}
			/>
    </DxPopup>
	)
}

export default Popup