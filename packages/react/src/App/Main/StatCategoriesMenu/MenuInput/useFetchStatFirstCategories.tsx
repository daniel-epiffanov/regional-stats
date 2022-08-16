import { useEffect, useState } from 'react';
import { StatCategories } from '../../../../../../../sharedTypes/gqlQueries';
import fetchStatFirstCategories from '../../../../queries/fetchStatFirstCategories';

type UseFetchFirstCategories = () => StatCategories | null

const useFetchStatFirstCategories: UseFetchFirstCategories = () => {
  const [statFirstCategories, setStatFirstCategories] = useState<StatCategories | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAndSaveStatFirstCategories = async () => {
      const subCategories = await fetchStatFirstCategories();
      if (!subCategories) return;
      if(isMounted) {
        setStatFirstCategories(subCategories);
      }
    };

    fetchAndSaveStatFirstCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return statFirstCategories;
};

export default useFetchStatFirstCategories;
