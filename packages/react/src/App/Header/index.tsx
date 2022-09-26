import { Toolbar, Item } from 'devextreme-react/toolbar';
import { FC } from 'react';
import styles from './Header.module.scss';
import Logo from './Logo';
import toggleTheme from '../../helpers/toggleTheme';
import { GITHUB_PROJECT_LINK, AUTHORS_TELEGRAM_LINK } from '../../config/links';
import { useToggle } from 'react-use';
import About from './About';

const Header: FC = () => {
  const [isAboutOpen, toggleIsAboutOpen] = useToggle(false);
  const closeAbout = () => {
    toggleIsAboutOpen(false);
  };

  const myGithubClickHandler = () => window.open(GITHUB_PROJECT_LINK);
  const myTelegramClickHandler = () => window.open(AUTHORS_TELEGRAM_LINK);
  const themeClickHandler = () => toggleTheme();
  const aboutClickHandler = () => toggleIsAboutOpen();

  return (
    <div className={styles['root']}>
      <About isOpen={isAboutOpen} closeAbout={closeAbout}/>
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
        <Item
          location="after"
          widget="dxButton"
          options={{
            onClick: aboutClickHandler,
            icon: 'fa fa-info-circle',
            text: 'О проекте',
          }}
        />
      </Toolbar>
    </div>
  );
};

export default Header;
