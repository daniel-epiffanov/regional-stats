import { useState } from 'react'

interface Return<Instance> {
	instance: Instance | null,
	onInitialized: OnInitialized
}

interface Event {
	component?: any | undefined;
	element?: HTMLElement | undefined;
}

type OnInitialized = (e: Event) => void

const useComponentInstance = <Instance, P = any>(): Return<Instance> => {
	const [instance, setInstance] = useState<Instance | null>(null)

	const onInitialized: OnInitialized = (e) => {
		if (e.component) setInstance(e.component)
	}

	const toReturn = { instance, onInitialized }
	return toReturn
}

export default useComponentInstance
