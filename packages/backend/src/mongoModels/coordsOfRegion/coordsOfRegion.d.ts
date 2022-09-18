import { RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';

export type MongoCoordsOfRegion = Readonly<{
	regionType: RegionTypeArg,
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
