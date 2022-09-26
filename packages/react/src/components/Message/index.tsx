import { FC, useEffect } from 'react';
// import { LoadPanel } from 'devextreme-react/load-panel';
import { ERROR_RELOAD_TIMEOUT_IN_SECONDS } from '../../config/settings';
import styles from './Message.module.scss';
import { LoadIndicator } from 'devextreme-react';

interface Props {
	text: string,
	type: 'error' | 'message',
	positionId?: string
}

const ERROR_RELOAD_TIMEOUT_IN_MILLISECONDS = ERROR_RELOAD_TIMEOUT_IN_SECONDS * 1000;

const Message: FC<Props> = ({ text, type, positionId }) => {
  useEffect(() => {
    if (type !== 'error') return;
    // const timeout = setTimeout(() => {
    //   window.location.reload();
    // }, ERROR_RELOAD_TIMEOUT_IN_MILLISECONDS);
    // return () => clearTimeout(timeout);
  }, [type]);

  if (type === 'message') {
    return (
      <div className={styles['root']}>
        <span>{text} Пожалуйста, подождите...</span>
        <LoadIndicator
          height={40}
          width={40}
        />
        {/* <LoadPanel visible shadingColor="#5757579c" position={{ of: `#${positionId}` }} /> */}
      </div>
    );
  }

  return (
    <div className={styles['root']}>
      <LoadIndicator
        height={40}
        width={40}
      />
      <span>{text}</span>
      <em>Страница будет перезагружена.</em>
    </div>
  );
};

Message.defaultProps = {
  positionId: 'root',
};

export default Message;
