import { Popup as DxPopup, Position } from 'devextreme-react/popup';
import { FC } from 'react';
import styles from './DxCustomPopup.module.scss';

type Props = Readonly<{
	isVisible: boolean,
	triggerId: string,
	hidingHandler: () => void,
	contentRenderHandler: () => JSX.Element,
  title?: string
}>

const titleRender = (title: string) => {
  console.log({title});
  return (
    <div className={styles['title-container']}>
      <h4>{title}</h4>
    </div>
  );
};

// *** To do: find a better solution to the popup height problem

const getMinHeight = (title: string) => {
  const MAX_NUMBER_OF_CHARS_IN_LINE = 80;
  const numberOFLines = title.length / MAX_NUMBER_OF_CHARS_IN_LINE;
  const DEFAULT_WIDTH = 450;
  const LINE_WIDTH = 30;
  return DEFAULT_WIDTH + (numberOFLines * LINE_WIDTH);
};

const DxCustomPopup: FC<Props> = (props) => {
  const {
    isVisible,
    hidingHandler,
    triggerId,
    contentRenderHandler,
    title = 'test title'
  } = props;


  return (
    <DxPopup
      visible={isVisible}
      contentRender={contentRenderHandler}
      onHiding={hidingHandler}
      closeOnOutsideClick
      maxWidth={850}
      dragEnabled={false}
      shading={false}
      title="Choose a category"
      // showCloseButton
      height={getMinHeight(title)}
      data-testid="popup"
      titleRender={() => titleRender(title)}
    >
      <Position
        at="left top"
        my="left top"
        of={triggerId}
      />
    </DxPopup>
  );
};

export default DxCustomPopup;
