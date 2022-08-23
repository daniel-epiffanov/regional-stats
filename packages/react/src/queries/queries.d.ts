export type GraphqlResponse<Data> = Readonly<{
	data: Data | null
}>