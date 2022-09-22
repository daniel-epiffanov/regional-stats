import { render, screen } from '@testing-library/react';
import Logo from '.';
import { LOGO_TEXT } from '../../../config/constants';

describe('Logo', () => {
  it('Logo text is the same as in the config', () => {
    render(<Logo  />);

    const bElement = screen.getByTestId('text');
    expect(bElement).toBeInTheDocument();
    expect(bElement.innerHTML).toBe(LOGO_TEXT);
  });

  it('Img is present', () => {
    render(<Logo  />);

    const imgElement: HTMLImageElement = screen.getByAltText('logo');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain('logo');
  });

});
