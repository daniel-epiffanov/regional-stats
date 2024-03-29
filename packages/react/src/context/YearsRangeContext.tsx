import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useYearsContext } from './YearsContext';
  
  
type ContextValues = Readonly<{
  yearsRange: ReadonlyArray<number>,
  changeYearsRange: ChangeYearsRange
}>

type ChangeYearsRange = (newYearsRange: ReadonlyArray<number>) => void

const YearsRangeContext = createContext<ContextValues>({} as ContextValues);
  
export const useYearsRangeContext = () => useContext(YearsRangeContext);
  
export const YearsRangeProvider: FC = (props) => {
  const { children } = props;
  const { years } = useYearsContext();

  const [yearsRange, setYearsRange] = useState<ReadonlyArray<number>>([2013, 2019]);
  const changeYearsRange: ChangeYearsRange = (newYearsRange) => {
    setYearsRange(newYearsRange);
  };

  useEffect(() => {
    if(!years) return;
    if(years.length <= 1) return setYearsRange([years[0], years[0]]);
    // @ts-ignore
    if(years.length <= 6) return setYearsRange([years[0], years.at(-1)]);
    // @ts-ignore
    setYearsRange([years[years.length - 7], years.at(-1)]);
  }, [years]);
	
  
  return (
    <YearsRangeContext.Provider value={{
      yearsRange,
      changeYearsRange
    }}
    >
      {children}
    </YearsRangeContext.Provider>
  );
};
  