import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import DxCustomPopup from '.';

const CONTENT_TEXT = 'test content';
const TRIGGER_ID = 'popup-trigger';
const hidingHandler = jest.fn();
const contentRenderHandler = () => <p>{CONTENT_TEXT}</p>;

describe('Popup', () => {
  it('popup is not displayed when isVisible is false', async () => {
    const { container } = render(
      <DxCustomPopup
        isVisible={false}
        triggerId={TRIGGER_ID}
        hidingHandler={hidingHandler}
        contentRender={contentRenderHandler}
      />,
    );

    await waitFor(() => {
      const contentParagraphElement = screen.queryByText(CONTENT_TEXT);
      expect(contentParagraphElement).toBeNull();

      const rootDivElement = container.getElementsByClassName('dx-overlay')[0];
      expect(rootDivElement).toBeInTheDocument();
      expect(rootDivElement).toHaveClass('dx-state-invisible');
    });

  });

  it('content is displayed when isVisible is true', async () => {
    const { container } = render(
      <DxCustomPopup
        isVisible
        triggerId={TRIGGER_ID}
        hidingHandler={hidingHandler}
        contentRender={contentRenderHandler}
      />,
    );

    await waitFor(() => {
      const contentParagraphElement = screen.getByText(CONTENT_TEXT);
      expect(contentParagraphElement).toBeInTheDocument();

      const rootDivElement = container.getElementsByClassName('dx-overlay')[0];
      expect(rootDivElement).toBeInTheDocument();
      expect(rootDivElement).not.toHaveClass('dx-state-invisible');

    });
  });

  // it('hidingHandler is being called on close', async () => {
  //   render(
  //     <DxCustomPopup
  //       isVisible
  //       triggerId={TRIGGER_ID}
  //       hidingHandler={hidingHandler}
  //       contentRenderHandler={contentRenderHandler}
  //     />,
  //   );

  //   const closeButtonElement = await screen.findByRole('button');
  //   expect(closeButtonElement).toBeInTheDocument();
  //   fireEvent.click(closeButtonElement);
  //   expect(hidingHandler).toBeCalledTimes(1);

  // });
});
