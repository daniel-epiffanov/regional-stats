export type MongoCoordsOfRegion = Readonly<{
	regionType: 'federalDistrict' | 'region',
	polygon: Readonly<{
		type: 'Polygon' | 'MultiPolygon',
		coordinates: ReadonlyArray<
            ReadonlyArray<
                ReadonlyArray<string>
            >
        >
	}>,
	regionName: string,
	dot: ReadonlyArray<number>
}>
