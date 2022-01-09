const NUMBER_OF_RANGE_PARTS = 10
const NUMBER_OF_INNER_RANGE_PARTS = NUMBER_OF_RANGE_PARTS - 2
const EXTREME_VALUES_INCREASE = 2

const makeColorGroupsRange = (values: number[]) => {
	const sortedValues = values.sort((a, b) => a - b)
	const lowestValue = sortedValues[0] - EXTREME_VALUES_INCREASE
	const higherValue = sortedValues.slice(-1)[0] + EXTREME_VALUES_INCREASE
	const remainderRange = higherValue - lowestValue
	const range = remainderRange / NUMBER_OF_INNER_RANGE_PARTS
	const colorGroupsRange = [lowestValue]

	for (let index = 0; index < NUMBER_OF_INNER_RANGE_PARTS; index += 1) {
		colorGroupsRange.push(colorGroupsRange.slice(-1)[0] + range)
	}
	colorGroupsRange.push(higherValue)

	return colorGroupsRange.map(colorGroupRangeItem => Math.floor(colorGroupRangeItem))
}

export default makeColorGroupsRange
