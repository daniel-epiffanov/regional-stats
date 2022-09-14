export type MongoMapRegion = Readonly<{
	type: 'federalDistrict' | 'region',
	polygon: Readonly<{
		type: 'Polygon' | 'MultiPolygon',
		coordinates: ReadonlyArray<
            ReadonlyArray<
                ReadonlyArray<string>
            >
        >
	}>,
	name: string,
	dot: ReadonlyArray<number>
}>
