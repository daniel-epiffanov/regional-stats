import { useState } from 'react';

type Return<Instance> = [Instance | null, OnInitializedHandler]

interface Event {
	component?: any | undefined;
	element?: HTMLElement | undefined;
}

type OnInitializedHandler = (e: Event) => void

const useComponentInstance = <Instance, P = any>(): Return<Instance> => {
  const [instance, setInstance] = useState<Instance | null>(null);

  const onInitializedHandler: OnInitializedHandler = (e) => {
    if (e.component) setInstance(e.component);
  };

  return [instance, onInitializedHandler];
};

export default useComponentInstance;
