import { useState } from 'react'

type UseComponentInstance<Component> = () => Return<Component>

interface Return<Component> {
	component: Component | null,
	onInitialized: OnInitialized
}

interface Event {
	component?: any | undefined;
	element?: HTMLElement | undefined;
}

type OnInitialized = (e: Event) => void

const useComponentInstance: UseComponentInstance<any> = () => {
	const [component, setComponent] = useState<any>(null)

	const onInitialized: OnInitialized = (e) => {
		if (e.component) setComponent(e.component)
	}

	return { component, onInitialized }
}

export default useComponentInstance
