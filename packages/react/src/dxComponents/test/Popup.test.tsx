import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Popup from '../Popup';

const popupTriggerId = "popup-trigger"
const hidingHandler = jest.fn()
const contentRenderHandler = () => <p>test content</p>


describe('Popup', () => {
	
	it('is not displayed when isVisible is false', async () => {

		const { container } = render(
			<Popup
				isVisible={false}
				popupTriggerId={popupTriggerId}
				hidingHandler={hidingHandler}
				contentRenderHandler={contentRenderHandler}
			/>
		)

		const contentDivElement = container.getElementsByClassName("dx-popup-content")[0]
		expect(contentDivElement).toBeInTheDocument()
		expect(contentDivElement).not.toBeVisible()
		
		screen.debug()
	})
	
	it('is content displayed when isVisible is true', async () => {
		
		render(
			<Popup
				isVisible
				popupTriggerId={popupTriggerId}
				hidingHandler={hidingHandler}
				contentRenderHandler={contentRenderHandler}
			/>
		)
		const contentParagraphElement = await screen.findByText(/test content/i)
		// const contentParagraphElement2 = screen.getByText(/test content/i)
		expect(contentParagraphElement).toBeInTheDocument()
		expect(contentParagraphElement).toBeVisible()

		// screen.debug()
	})
	

})
