import { useEffect, useState } from 'react';
import { StatCategories } from '../../../../../../../sharedTypes/gqlQueries';
import useFetchStatFirstCategories from './useFetchStatFirstCategories';
import useFetchStatSecondCategories from './useFetchStatSecondCategories';
import fetchStatThirdCategories from '../../../../queries/fetchStatThirdCategories';
import { useCurMenuValuesContext } from '../../../../context/MenuContext';

export type CurCategories = Readonly<{
	statCategoriesChain: string[],
	isChainComplete: boolean,
}>

const useCategories = () => {
  const statFirstCategories = useFetchStatFirstCategories();
  const { setMenuValues: setCurMenuValues } = useCurMenuValuesContext();

  const [curStatCategories, setCurStatCategories] = useState<CurCategories>({
    statCategoriesChain: [],
    isChainComplete: false,
  });

  const curStatFirstCategory = curStatCategories.statCategoriesChain[0];
  const curStatSecondCategory = curStatCategories.statCategoriesChain[1];
  const curStatThirdCategory = curStatCategories.statCategoriesChain[2];
  const isChainComplete = curStatCategories.isChainComplete;

  useEffect(() => {
    if (isChainComplete) {
      setCurMenuValues({
        curStatCategories: {
          firstCategory: curStatFirstCategory,
          secondCategory: curStatSecondCategory,
          thirdCategory: curStatThirdCategory
        },
      });
    }
  }, [curStatFirstCategory, curStatSecondCategory, curStatThirdCategory, isChainComplete]);

  const statSecondCategories = useFetchStatSecondCategories(curStatFirstCategory);
  const [statThirdCategories, setStatThirdCategories] = useState<StatCategories | null>(null);

  const changeStatFirstCategory = async (newStatFirstCategory: string) => {
    setCurStatCategories({ statCategoriesChain: [newStatFirstCategory], isChainComplete: false });
    setStatThirdCategories(null);
  };

  const changeStatSecondCategory = async (newStatSecondCategory: string) => {
    const statThirdCategories = await fetchStatThirdCategories(curStatFirstCategory, newStatSecondCategory);
    setStatThirdCategories(statThirdCategories);

    if (statThirdCategories) {
      setCurStatCategories({ statCategoriesChain: [curStatFirstCategory, newStatSecondCategory], isChainComplete: false });
      return;
    }

    setCurStatCategories({ statCategoriesChain: [curStatFirstCategory, newStatSecondCategory], isChainComplete: true });
  };

  const changeStatThirdCategory = async (newStatThirdCategory: string) => {
    setCurStatCategories({
      statCategoriesChain: [curStatFirstCategory, curStatSecondCategory, newStatThirdCategory],
      isChainComplete: true,
    });
  };

  return {
    statFirstCategories,
    changeStatFirstCategory,

    statSecondCategories,
    changeStatSecondCategory,

    statThirdCategories,
    changeStatThirdCategory,
  };
};

export default useCategories;
