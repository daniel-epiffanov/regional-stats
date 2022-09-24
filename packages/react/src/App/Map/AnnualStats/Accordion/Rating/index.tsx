import { FC, useEffect, useState } from 'react';
import {
  DataGrid, Paging, Column
} from 'devextreme-react/data-grid';
import styles from './Rating.module.scss';
import { RowClickEvent, RowPreparedEvent } from 'devextreme/ui/data_grid';
import { useRegionNamesContext } from '../../../../../context/RegionNamesContext';
import useAnnualStatsRatingQuery from './useAnnualStatsRatingQuery';
import { useYearsContext } from '../../../../../context/YearsContext';
import { useCategoriesMenuContext } from '../../../../../context/CategoriesMenuContext';
import Message from '../../../../../components/Message';
import { GqlAnnualStatsRatingItem } from '../../../../../../../../sharedTypes/gqlQueries';

const renderGridCell = (cellData: Readonly<{value: string}>) => (
  <div>
    <img src={cellData.value} width={48} height={25}></img>
  </div>
);

const PAGE_SIZE = 5;

const Rating: FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const {regionType,curRegionNames, addCurRegionNames} = useRegionNamesContext();
  const {curYear} = useYearsContext();
  const {curCategoryNames} = useCategoriesMenuContext();
  const {curMainCategoryName, curSubCategoryName, curSubSubCategoryName} = curCategoryNames;

  const flagRenderingHandler = async (e: RowPreparedEvent<GqlAnnualStatsRatingItem>) => {
    if(!curRegionNames.includes(e?.data?.regionName)) return null;
    e.rowElement.style.background = '#3eaaf5';
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
  
  useEffect(()=>{
    if(!annualStatsRating || !curRegionNames[0]) return;
    const regionIndex = annualStatsRating
      .findIndex(annualStatsRatingItem=>annualStatsRatingItem.regionName === curRegionNames[0]);
    const page = Math.floor(regionIndex / PAGE_SIZE);
    setPageIndex(page);
  }, [annualStatsRating, curRegionNames[0]]);

  if (!annualStatsRating) return <Message type="message" text="Загрузка рейтинга регионов" />;

  return (
    <div className={styles['root']}>
      <DataGrid
        id="dataGrid"
        dataSource={annualStatsRating || undefined}
        keyExpr="regionRank"
        onRowPrepared={flagRenderingHandler}
        hoverStateEnabled
        onRowClick={rowClickHandler}
      >
        <Paging
          pageSize={PAGE_SIZE}
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

export default Rating;