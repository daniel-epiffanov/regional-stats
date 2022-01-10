import { useState } from 'react'

interface Return<Instance> {
	instance: Instance | null,
	onInitializedHandler: OnInitializedHandler
}

interface Event {
	component?: any | undefined;
	element?: HTMLElement | undefined;
}

type OnInitializedHandler = (e: Event) => void

const useComponentInstance = <Instance, P = any>(): Return<Instance> => {
	const [instance, setInstance] = useState<Instance | null>(null)

	const onInitializedHandler: OnInitializedHandler = (e) => {
		if (e.component) setInstance(e.component)
	}

	const toReturn = { instance, onInitializedHandler }
	return toReturn
}

export default useComponentInstance
