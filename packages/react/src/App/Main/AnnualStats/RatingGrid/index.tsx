import { FC, useEffect, useState } from 'react';
import {
  DataGrid, Paging, Column, Export
} from 'devextreme-react/data-grid';
import styles from './RatingData.module.scss';
import { RowClickEvent, RowPreparedEvent } from 'devextreme/ui/data_grid';
import { useRegionNamesContext } from '../../../../context/RegionNamesContext';
import useAnnualStatsRatingQuery from './useAnnualStatsRatingQuery';
import { useYearsContext } from '../../../../context/YearsContext';
import { useCategoriesMenuContext } from '../../../../context/CategoriesMenuContext';
import Message from '../../../../components/Message';
import { GqlAnnualStatsRatingItem } from '../../../../../../../sharedTypes/gqlQueries';
import { PAGE_SIZE } from '../../../../config/ratingGrid';
import { useAnnualStatsContext } from '../../../../context/AnnualStatsContext';

const renderGridCell = (cellData: Readonly<{value: string}>) => (
  <div>
    <img src={cellData.value} width={48} height={25}></img>
  </div>
);

type Props = Readonly<{
  pageSize?: number
}>

const RatingGrid: FC<Props> = (props) => {
  const pageSize = props.pageSize || PAGE_SIZE;

  const [pageIndex, setPageIndex] = useState(0);
  const {regionType,curRegionNames, addCurRegionNames} = useRegionNamesContext();
  const {curYear} = useYearsContext();
  const {curCategoryNames} = useCategoriesMenuContext();
  const {annualStats} = useAnnualStatsContext();
  const {curMainCategoryName, curSubCategoryName, curSubSubCategoryName} = curCategoryNames;

  const rowPreparedHandler = async (e: RowPreparedEvent<GqlAnnualStatsRatingItem>) => {
    e.rowElement.style.background = e?.data?.paletteColor;//'#3eaaf5';
    if(!curRegionNames.includes(e?.data?.regionName)) return null;
    e.rowElement.style.background = '#d9514e';
  };

  const pageIndexChangeHandler = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };
  
  const rowClickHandler = (e: RowClickEvent<GqlAnnualStatsRatingItem>) => {
    addCurRegionNames(e.data.regionName);
  };

  const annualStatsRating = useAnnualStatsRatingQuery(
    regionType,
    curYear,
    curMainCategoryName,
    curSubCategoryName,
    curSubSubCategoryName
  );

  console.log({annualStatsRating});
  
  useEffect(()=>{
    if (annualStatsRating === 'loading' || annualStatsRating === 'error') return;
    if(!annualStatsRating || !curRegionNames[0]) return;
    const regionIndex = annualStatsRating
      // @ts-ignore
      .findIndex(annualStatsRatingItem=>annualStatsRatingItem.regionName === curRegionNames.at(-1));
    const page = Math.floor(regionIndex / pageSize);
    setPageIndex(page);
  }, [annualStatsRating, curRegionNames]);

  if (annualStatsRating === 'loading') {
    return <Message type="message" text="Загрузка рейтинга регионов" />;
  }
  if (annualStatsRating === 'error') {
    return <Message type="error" text="При загрузке рейтинга произошла ошибка" />;
  }
  if (!annualStatsRating) {
    return <Message type="info" text="Данных для составления рейтинга за текущий год нет" />;
  }

  return (
    <div className={styles['root']}>
      <p>Единица измерения значений, на основании которых выстроен рейтинг - {annualStats[0].measure}</p>
      <DataGrid
        id="dataGrid"
        dataSource={annualStatsRating || undefined}
        keyExpr="regionRank"
        onRowPrepared={rowPreparedHandler}
        hoverStateEnabled
        onRowClick={rowClickHandler}
      >
        <Paging
          pageSize={pageSize}
          onPageIndexChange={pageIndexChangeHandler}
          pageIndex={pageIndex}
        />

        <Column
          dataField="regionRank"
          width={50}
          caption="Место"
          allowSorting={false}
        />
        <Column
          dataField="regionFlagUrl"
          width={50}
          cellRender={renderGridCell}
          caption="Флаг"
          allowSorting={false}
        />
        <Column
          dataField="regionName"
          caption="Регион"
          allowSorting={false}
        />
        <Column
          dataField="prettyValue"
          width={100}
          caption="Значение"
          allowSorting={false}
        />
      </DataGrid>
    </div>
  );
};

export default RatingGrid;