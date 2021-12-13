import { RegionsCoords } from './mongoModels';
import { YearValue } from './regionStatistics';

export type YearsQuery = number[]
export type RegionNamesQuery = string[]
export type MainSectionNamesQuery = string[]
export type SubSectionNamesQuery = string[]
export type StatisticsByYearsQuery = YearValue[]
export type CoordsByRegionTypeQuery = RegionsCoords[]