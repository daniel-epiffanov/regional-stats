import { useEffect, useState } from 'react';
import { StatCategories } from '../../../../sharedTypes/gqlQueries';
import fetchStatSecondCategories from '../queries/fetchStatSecondCategories';
import fetchStatData from '../queries/fetchStatData';
import { CurCategories } from '../App/Main/StatCategoriesMenu/MenuInput/useCategories';
import { usePrefetchedValuesContext } from '../context/PrefetchedValuesContext';
import { useCurMenuValuesContext } from '../context/MenuContext';

type UseWatchStatData = (curCategories: CurCategories) => void

const useFetchStatData: UseWatchStatData = (curCategories) => {
  // const { statRegionNames } = usePrefetchedValuesContext();
  // const { setCurMenuValues: setCurValues } = useCurMenuValuesContext();

  // useEffect(() => {
  //   const fetchAndSaveStatData = async () => {
  //     if (!curCategories.isChainComplete) return;

  //     const curStatData = await fetchStatData({
  //       regionNames: statRegionNames,
  //       mainCategory: curCategories.statCategoriesChain[0],
  //       subCategory: curCategories.statCategoriesChain[1],
  //       subSubCategory: curCategories.statCategoriesChain[2] || undefined,
  //     });

  //     if (!curStatData) return;
  //     setCurValues({ curStatData });
  //   };

  //   fetchAndSaveStatData();
  // }, [curCategories.isChainComplete]);
};

export default useFetchStatData;