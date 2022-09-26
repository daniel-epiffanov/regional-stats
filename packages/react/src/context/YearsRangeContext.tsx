import { createContext, FC, useContext, useState } from 'react';
  
  
type ContextValues = Readonly<{
  yearsRange: ReadonlyArray<number>,
  changeYearsRange: ChangeYearsRange
}>

type ChangeYearsRange = (newYearsRange: ReadonlyArray<number>) => void

const YearsRangeContext = createContext<ContextValues>({} as ContextValues);
  
export const useYearsRangeContext = () => useContext(YearsRangeContext);
  
export const YearsRangeProvider: FC = (props) => {
  const { children } = props;

  const [yearsRange, setYearsRange] = useState<ReadonlyArray<number>>([2013, 2019]);
  const changeYearsRange: ChangeYearsRange = (newYearsRange) => {
    setYearsRange(newYearsRange);
  };
  
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
  