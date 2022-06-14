import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

		await waitFor(() => {
			const contentParagraphElement2 = container.getElementsByClassName('dx-state-invisible')[0]
			// console.log({d: contentParagraphElement2})
			// const style = window.getComputedStyle(profilePicElem[0]);
			// console.log({getComputedStyle: window.getComputedStyle(contentParagraphElement2)})
			expect(window.getComputedStyle(contentParagraphElement2).display).toBe('none')
			// expect(contentParagraphElement2).toHave("block")
			// expect(contentParagraphElement2).toBeInTheDocument()
			// expect(contentParagraphElement2).toHaveAttribute('style', { display: 'none'})

			screen.debug()
		})

		// const contentParagraphElement2 = await screen.findByTestId('popup')
		// const contentParagraphElement = await screen.findByAtt("dialog")
		// const contentParagraphElement = await screen.queryByText('test content')
		// expect(contentParagraphElement).not.toBeNull()
		// expect(contentDivElement).not.toBeVisible()
		// const contentDivElement = container.getElementsByClassName("dx-state-invisible")[0]

		// console.log({contentParagraphElement})
		
	})
	
	// it('is content displayed when isVisible is true', async () => {
		
	// 	render(
	// 		<Popup
	// 			isVisible
	// 			popupTriggerId={popupTriggerId}
	// 			hidingHandler={hidingHandler}
	// 			contentRenderHandler={contentRenderHandler}
	// 		/>
	// 	)
	// 	// const contentParagraphElement = await screen.findByText(/test content/i)
	// 	// expect(contentParagraphElement).toBeInTheDocument()
	// 	// expect(contentParagraphElement).toBeVisible()

	// 	// screen.debug()
	// })
	

})
