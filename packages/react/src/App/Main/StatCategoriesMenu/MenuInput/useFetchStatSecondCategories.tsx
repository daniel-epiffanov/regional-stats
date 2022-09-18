import { useEffect, useState } from 'react';
import { GqlAnnualStatsCategoryNames } from '../../../../../../../sharedTypes/gqlQueries';
import fetchStatSecondCategories from '../../../../queries/fetchStatSecondCategories';

type UseFetchStatSecondCategories = (statFirstCategory: string) => GqlAnnualStatsCategoryNames | null

const useFetchStatSecondCategories: UseFetchStatSecondCategories = (statFirstCategory) => {
  const [statSecondCategories, setStatSecondCategories] = useState<GqlAnnualStatsCategoryNames | null>(null);

  useEffect(() => {
    const fetchAndSaveStatSecondCategories = async () => {
      if (!statFirstCategory) return;
      const subCategories = await fetchStatSecondCategories(statFirstCategory);
      if (!subCategories) return;
      setStatSecondCategories(subCategories);
    };

    fetchAndSaveStatSecondCategories();
  }, [statFirstCategory]);

  return statSecondCategories;
};

export default useFetchStatSecondCategories;
