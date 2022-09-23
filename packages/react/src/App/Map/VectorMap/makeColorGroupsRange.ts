const NUMBER_OF_RANGE_PARTS = 7;
const NUMBER_OF_INNER_RANGE_PARTS = NUMBER_OF_RANGE_PARTS - 2;
const EXTREME_VALUES_INCREASE = 1;
const REMINDER_RANGE_DECREASER = 0.9;

const makeColorGroupsRange = (values: number[]) => {
  const sortedValues = values.sort((a, b) => a - b);
  const lowestValue = sortedValues[0] - EXTREME_VALUES_INCREASE;
  const higherValue = sortedValues.slice(-1)[0] + EXTREME_VALUES_INCREASE;
  const remainderRange = (higherValue - lowestValue) * REMINDER_RANGE_DECREASER;
  const range = remainderRange / NUMBER_OF_INNER_RANGE_PARTS;
  const colorGroupsRange = [lowestValue];

  for (let index = 0; index < NUMBER_OF_INNER_RANGE_PARTS; index += 1) {
    const nextRangePoint = colorGroupsRange.slice(-1)[0] + range;

    const closest = sortedValues.reduce((a, b) => {
      return Math.abs(b - nextRangePoint) < Math.abs(a - nextRangePoint) ? b : a;
    });
    colorGroupsRange.push(closest);
  }
  colorGroupsRange.push(higherValue);

  const flooredColorGroupsRange = colorGroupsRange
    .map(colorGroupRangeItem => Math.floor(colorGroupRangeItem));

  // const reversedColorGroupsRange = flooredColorGroupsRange.sort((a, b) => a + b)

  return flooredColorGroupsRange;
};

export default makeColorGroupsRange;
