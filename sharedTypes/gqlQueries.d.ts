import { MultipleRegionsCoordsModel } from './mongoModels';
import { YearValue } from './statistics';

export type YearsQuery = number[]
export type RegionNamesQuery = string[]
export type MainSectionNamesQuery = string[]
export type SubSectionNamesQuery = string[]
export type StatisticsByYearsQuery = YearValue[]
export type MultipleRegionsCoordsQuery = MultipleRegionsCoordsModel[]