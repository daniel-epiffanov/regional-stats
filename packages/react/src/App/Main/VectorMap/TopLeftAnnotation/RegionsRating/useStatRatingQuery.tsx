import { useEffect, useState } from 'react';
import { GqlStatRating } from '../../../../../../../../sharedTypes/gqlQueries';
import { useMapContext } from '../../../../../context/MapContext';
import { useMenuContext } from '../../../../../context/MenuContext';
import fetchStatRating from '../../../../../queries/fetchStatRating';

const useStatRatingQuery = () => {
  const [statRating, setStatRating] = useState<null | ReadonlyArray<GqlStatRating>>();
  const year = 2002;
  const {curStatCategories} = useMenuContext();
  const {curRegionNames, mapRegionNames} = useMapContext();

  useEffect(() => {
    (async ()=> {
      const curRegionName = curRegionNames[0];
      if(!curRegionName || !curStatCategories.firstCategory || !curStatCategories.secondCategory) return;
      const statRating = await fetchStatRating({
        year,
        mainCategory: curStatCategories.firstCategory,
        subCategory: curStatCategories.secondCategory,
        subSubCategory: curStatCategories.thirdCategory,
        regionNames: mapRegionNames
      });
      if(!Array.isArray(statRating) || statRating.length === 0) return;
      setStatRating(statRating);
    })();
  }, [curRegionNames[0], mapRegionNames, curStatCategories.firstCategory, curStatCategories.secondCategory]);

  return statRating;
};

export default useStatRatingQuery;