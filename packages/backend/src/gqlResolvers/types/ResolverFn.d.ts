export type ResolverFn<ReturnValue> = (
	parent: any, args: any, context: any, info: any
) => ReturnValue | null

export type ResolverFnAsync<ReturnValue> = (
	parent: any, args: any, context: any, info: any
) => Promise<ReturnValue | null>
