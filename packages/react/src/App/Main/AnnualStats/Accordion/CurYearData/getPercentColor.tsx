import { BLUE_COLOR, RED_COLOR } from '../../../../../config/theme';

const getPercentColor = (percent: number) => {
  if(percent === 0) return 'grey';
  if(percent > 0) return BLUE_COLOR;
  return RED_COLOR;
};

export default getPercentColor;