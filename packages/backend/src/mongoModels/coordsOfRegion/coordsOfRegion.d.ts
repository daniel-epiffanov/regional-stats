import { RegionTypeArg } from '../../../../../sharedTypes/gqlQueries';

export type MongoCoordsOfRegion = Readonly<{
	regionType: RegionTypeArg,
	polygon: Readonly<{
		type: 'Polygon' | 'MultiPolygon',
		coordinates: ReadonlyArray<
            ReadonlyArray<
                ReadonlyArray<number>
            >
        >
	}>,
	regionName: string,
	point: Readonly<{
		type: 'Point',
		coordinates: ReadonlyArray<number>
	}>
}>
