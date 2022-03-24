const exampleData: any = [
	{
		fileName: 'excel statistics of economics',
		fileExtention: 'xlsx',
		contentsMaorderNumberp: null,
		sheets: [
			{
				orderNumber: '1',
				sheetTitle: 'sciense',
				regions: {
					federalDistricts: [
						{
							name: 'Рязанская облас',
							years: [
								{
									year: 2007,
									value: 5,
								},
							],
						},
					],
				},
			},
		],
	},
]

export {
	// eslint-disable-next-line import/prefer-default-export
	exampleData,
}
