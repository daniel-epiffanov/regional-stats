import { YearValue } from './statistics.d';
export type ResolverFn<ReturnValue> = (parent: any, args: any, ctx: any) => ReturnValue
export type ResolverFnAsync<ReturnValue> = (parent: any, args: any, ctx: any) => Promise<ReturnValue>

export type Years = number[]
export type RegionNames = string[]
export type MainSectionNames = string[]
export type SubSectionTitles = string[]
export type StatisticsByYears = YearValue[]