import { useEffect, useState } from 'react';
import { GqlAnnualStatsCategoryNames } from '../../../../../../../sharedTypes/gqlQueries';
import fetchStatFirstCategories from '../../../../queries/fetchStatFirstCategories';

type UseFetchFirstCategories = () => GqlAnnualStatsCategoryNames | null

const useFetchStatFirstCategories: UseFetchFirstCategories = () => {
  const [statFirstCategories, setStatFirstCategories] = useState<GqlAnnualStatsCategoryNames | null>(null);

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
