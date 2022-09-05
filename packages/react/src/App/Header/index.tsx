import { Toolbar, Item } from 'devextreme-react/toolbar';
import { FC } from 'react';
import styles from './Header.module.scss';
import Logo from './Logo';
import chageTheme from '../../devExtremeHelpers/chageThemeHundler';
import { GITHUB_LINK, TELEGRAM_LINK } from '../../config/constants';

const Header: FC = () => {
  const myGithubClickHandler = () => window.open(GITHUB_LINK);
  const myTelegramClickHandler = () => window.open(TELEGRAM_LINK);
  const themeClickHandler = () => chageTheme();

  return (
    <div className={styles['root']}>
      <Toolbar>
        <Item
          location="before"
          render={Logo}
        />
        <Item
          location="after"
          widget="dxButton"
          options={{
            onClick: myGithubClickHandler,
            text: 'GitHub',
            icon: 'fab fa-github',
          }}
        />
        <Item
          location="after"
          widget="dxButton"
          options={{
            onClick: myTelegramClickHandler,
            text: 'Telegram',
            icon: 'fab fa-telegram',
          }}
        />
        <Item
          location="after"
          widget="dxButton"
          options={{
            onClick: themeClickHandler,
            icon: 'far fa-lightbulb',
            text: 'Тема',
          }}
        />
      </Toolbar>
    </div>
  );
};

export default Header;
