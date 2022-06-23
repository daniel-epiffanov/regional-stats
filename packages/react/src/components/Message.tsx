import { FC, useEffect } from 'react';
import { LoadPanel } from 'devextreme-react/load-panel';
import { ERROR_RELOAD_TIMEOUT_IN_SECONDS } from '../config/settings';

interface Props {
	text: string,
	type: 'error' | 'message',
	positionId?: string
}

const ERROR_RELOAD_TIMEOUT_IN_MILLISECONDS = ERROR_RELOAD_TIMEOUT_IN_SECONDS * 1000;

const Message: FC<Props> = ({ text, type, positionId }) => {
  useEffect(() => {
    if (type !== 'error') return;
    setTimeout(() => {
      window.location.reload();
    }, ERROR_RELOAD_TIMEOUT_IN_MILLISECONDS);
  }, [type]);

  if (type === 'message') {
    return (
      <div>
        <span>{text} Please, wait...</span>
        <LoadPanel visible shadingColor="#5757579c" position={{ of: `#${positionId}` }} />
      </div>
    );
  }

  return (
    <span>
      <strong>
        {text} <em>We will reload the page in {ERROR_RELOAD_TIMEOUT_IN_SECONDS} seconds.</em>
      </strong>
    </span>
  );
};

Message.defaultProps = {
  positionId: 'root',
};

export default Message;
