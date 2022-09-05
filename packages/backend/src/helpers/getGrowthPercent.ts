const getGrowthPercent = (curNumber: number, prevNumber: number) => {
  const delta = curNumber - prevNumber;
  const percent = (delta * 100) / prevNumber;
  const roundedPercent = Math.round(percent * 100) / 100;

  return roundedPercent;
};

export default getGrowthPercent;
