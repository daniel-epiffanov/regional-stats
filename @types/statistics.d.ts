export interface YearValue {
	year: number,
	value: string,
}

export interface SubSection {
	orderNumber: string,
	title: string,
	children: SubSection[],
	yearValues: {
		type: YearValue[],
	},
}

export interface MainSection {
	name: string,
	fullFilename: string,
	subSections: SubSection[],
}

export interface Statistics {
	regionName: string,
	mainSections: MainSection[],
}