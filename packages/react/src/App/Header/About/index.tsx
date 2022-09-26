import { Popup } from 'devextreme-react';
import { FC } from 'react';
import PopupContent from './PopupContent';


type Props = Readonly<{
  isOpen: boolean,
  closeAbout: () => void
}>

const contentRender = () => {
  return (
    <PopupContent />
  );
};

const About: FC<Props> = ({isOpen, closeAbout}) => {
  return (
    <Popup
      visible={isOpen}
      contentRender={contentRender}
      onHiding={closeAbout}
      closeOnOutsideClick
      maxWidth={850}
      dragEnabled={false}
      shading={false}
      title="О проекте"
      data-testid="popup"
    />
  );
};

export default About;