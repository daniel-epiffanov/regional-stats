const getPercentColor = (percent: number) => {
  if(percent === 0) return 'grey';
  if(percent > 0) return '#90ee91';
  return 'red';
};

export default getPercentColor;