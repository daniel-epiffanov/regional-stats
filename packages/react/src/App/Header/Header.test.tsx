import { fireEvent, render, screen } from '@testing-library/react';
import Header from '.';
import {
  DARK_THEME_NAME,
  DEFAULT_THEME,
  GITHUB_LINK,
  LIGHT_THEME_NAME,
  TELEGRAM_LINK
} from '../../config/constants';
import themes from 'devextreme/ui/themes';

const spyWindowOpen = jest.spyOn(window, 'open');
const spyLocalStorageSetItem = jest.spyOn(window.localStorage.__proto__, 'setItem');

describe('Header', () => {

  it('github link', () => {
    render(<Header  />);

    const divElement = screen.getByText('GitHub');
    expect(divElement).toBeInTheDocument();

    fireEvent.click(divElement);

    expect(spyWindowOpen).toBeCalledTimes(1);
    expect(spyWindowOpen).toBeCalledWith(GITHUB_LINK);
  });

  it('telegram link', () => {
    render(<Header  />);

    const divElement = screen.getByText('Telegram');
    expect(divElement).toBeInTheDocument();

    fireEvent.click(divElement);

    expect(spyWindowOpen).toBeCalledTimes(1);
    expect(spyWindowOpen).toBeCalledWith(TELEGRAM_LINK);
  });

  it('theme toggle', () => {
    render(<Header  />);

    const divElement = screen.getByText('Тема');
    expect(divElement).toBeInTheDocument();

    fireEvent.click(divElement);
    expect(spyLocalStorageSetItem).toBeCalledTimes(1);

    const curTheme = window.localStorage.getItem('dx-theme') || DEFAULT_THEME;

    if(curTheme === DARK_THEME_NAME) {
      expect(spyLocalStorageSetItem).toBeCalledWith('dx-theme', LIGHT_THEME_NAME);
    } else {
      expect(spyLocalStorageSetItem).toBeCalledWith('dx-theme', DARK_THEME_NAME);
    }
  });

});