export default class Helpers {
	protected getRange = (
		startNumber: number,
		endNumber: number,
	) => {
		const ADDER_TO_INCLUDE_ONE_MORE_YEAR = 1

		return [...Array((endNumber + ADDER_TO_INCLUDE_ONE_MORE_YEAR) - startNumber)]
			.map((element, index) => index + startNumber)
	}

	protected getObjectFromTwoArrays = (keys: any[], values: any[]) => {
		const result: any = {}
		keys.forEach((key, i) => {
			result[key] = values[i]
		})
		return result
	}
}
