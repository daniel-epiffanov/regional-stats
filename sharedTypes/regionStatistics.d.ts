export interface YearValue {
	year: number,
	value: string,
}

export interface SubSection {
	name: string,
	orderNumber: string,
	children: SubSection[],
	yearValues: YearValue[],
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
