import RangeSelector, {
	Margin, Scale, MinorTick, Label, SliderMarker, SliderHandle,
} from 'devextreme-react/range-selector'

const mock = [
	{
		arg: '2017',
		val: 2017,
	},
	{
		arg: '2018',
		val: 2018,
	},
	{
		arg: '2019',
		val: 2019,
	},
	{
		arg: '2020',
		val: 2020,
	},
	{
		arg: '2021',
		val: 2021,
	},
]

export default function () {
	return (
		<RangeSelector
			// id="range-selector"
			// title="Select House Price Range"
			defaultValue={[2019, 2021]}
			dataSource={mock}
		// value={{ endValue: 2019, startValue: 2021 }}
		>
			<Margin top={50} />
			<Scale>
				<MinorTick visible={false} />
				<Label format="year" />
			</Scale>
			<SliderMarker font={{ weight: 16, size: 16 }} />
			<SliderHandle width={10} />
		</RangeSelector>
	)
}
