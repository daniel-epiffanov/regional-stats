const getPercentColor = (percent: number) => {
  if(percent === 0) return 'grey';
  if(percent > 0) return '#3eaaf5';
  return 'red';
};

export default getPercentColor;