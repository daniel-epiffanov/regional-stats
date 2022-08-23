import { useEffect, useState } from 'react';
import { StatCategories } from '../../../../../../../sharedTypes/gqlQueries';
import useFetchStatFirstCategories from './useFetchStatFirstCategories';
import useFetchStatSecondCategories from './useFetchStatSecondCategories';
import fetchStatThirdCategories from '../../../../queries/fetchStatThirdCategories';
import { useMenuValuesContext } from '../../../../context/MenuContext';

const useCategories = () => {
  const { setMenuValues, curStatCategories } = useMenuValuesContext();

  const statFirstCategories = useFetchStatFirstCategories();
  const statSecondCategories = useFetchStatSecondCategories(curStatCategories.firstCategory || '');
  const [statThirdCategories, setStatThirdCategories] = useState<StatCategories | null>(null);


  const changeStatFirstCategory = async (newStatFirstCategory: string) => {
    setMenuValues({
      curStatCategories: {
        firstCategory: newStatFirstCategory,
        secondCategory: null,
        thirdCategory: null
      },
    });
    setStatThirdCategories(null);
  };

  const changeStatSecondCategory = async (newStatSecondCategory: string) => {
    const statThirdCategories = await fetchStatThirdCategories(curStatCategories.firstCategory || '', newStatSecondCategory);
    setStatThirdCategories(statThirdCategories);

    setMenuValues({
      curStatCategories: {
        firstCategory: curStatCategories.firstCategory,
        secondCategory: newStatSecondCategory,
        thirdCategory: null
      },
    });
    return;

  };

  const changeStatThirdCategory = async (newStatThirdCategory: string) => {
    setMenuValues({
      curStatCategories: {
        firstCategory: curStatCategories.firstCategory,
        secondCategory: curStatCategories.secondCategory,
        thirdCategory: newStatThirdCategory
      },
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
