import {
  createContext, FC, useContext, useState,
} from 'react';

type YearsRange = ReadonlyArray<number>

type ContextValues = Readonly<{
	yearsRange: YearsRange,
    changeYearsRange: ChangeYearsRange
}>

type ChangeYearsRange = (yearsRange: YearsRange) => void



const YearsRangeContext = createContext<ContextValues>({} as ContextValues);

export const useYearsRangeContext = () => useContext(YearsRangeContext);

export const YearsRangeProvider: FC = ({ children }) => {
  const [yearsRange, setYearsRange] = useState<YearsRange>([2002, 2006]);
  const changeYearsRange: ChangeYearsRange = (newYearsRange) => {
    setYearsRange(newYearsRange);
  };

  return (
    <YearsRangeContext.Provider value={{
      yearsRange,
      changeYearsRange
    }}>
      {children}
    </YearsRangeContext.Provider>
  );
};
