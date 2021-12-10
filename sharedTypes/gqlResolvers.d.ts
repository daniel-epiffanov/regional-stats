import { MultipleRegionsCoordsModel } from './mongoModels';
import { YearValue } from './statistics';
export type ResolverFn<ReturnValue> = (parent: any, args: any, ctx: any) => ReturnValue
export type ResolverFnAsync<ReturnValue> = (parent: any, args: any, ctx: any) => Promise<ReturnValue>

export type Years = number[]
export type RegionNames = string[]
export type MainSectionNames = string[]
export type SubSectionTitles = string[]
export type StatisticsByYears = YearValue[]
export type MultipleRegionsCoords = MultipleRegionsCoordsModel[]

// export interface MultipleRegionsCoords {
// 	type: 'FeatureCollection',
// 	features: MultipleRegionsCoordsModel[]
// }

export type GqlResponse<Data> = {
	data: Data
}