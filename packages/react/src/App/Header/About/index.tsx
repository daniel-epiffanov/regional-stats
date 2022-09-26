import { Popup, ScrollView } from 'devextreme-react';
import { FC } from 'react';
import PopupContent from './PopupContent';


type Props = Readonly<{
  isOpen: boolean,
  closeAbout: () => void
}>

const About: FC<Props> = ({isOpen, closeAbout}) => {
  return (
    <Popup
      visible={isOpen}
      onHiding={closeAbout}
      closeOnOutsideClick
      maxWidth={850}
      dragEnabled={false}
      title="О проекте"
      data-testid="popup"
      showTitle={false}
      height="100vh"
      width="100vw"
      shadingColor='#000000b3'
    >
      <ScrollView>
        <PopupContent closeAbout={closeAbout}/>
      </ScrollView>
    </Popup>
  );
};

export default About;