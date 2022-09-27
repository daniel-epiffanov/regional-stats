import { Popup as DxPopup, Position } from 'devextreme-react/popup';
import { FC } from 'react';
import styles from './DxCustomPopup.module.scss';

type Props = Readonly<{
	isVisible: boolean,
	triggerId: string,
	hidingHandler: () => void,
	contentRender: () => JSX.Element,
  title?: string
}>

const titleRender = (title: string) => {
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
    contentRender: contentRenderHandler,
    title = 'test title'
  } = props;


  return (
    <div style={{
      left: '1rem'
    }}>

      <DxPopup
        visible={isVisible}
        contentRender={contentRenderHandler}
        onHiding={hidingHandler}
        closeOnOutsideClick
        maxWidth={850}
        dragEnabled={false}
        // shading={false}
        shadingColor='#000000b3'
        title="Choose a category"
        // showCloseButton
        height={getMinHeight(title)}
        data-testid="popup"
        titleRender={() => titleRender(title)}
      >
        {/* <Position
        at="left top"
        my="left top"
        of={triggerId}
      /> */}
      </DxPopup>
    </div>
  );
};

export default DxCustomPopup;
