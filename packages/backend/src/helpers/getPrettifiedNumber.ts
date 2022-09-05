const getPrettifiedNumber = (value: number | null) => {
  if (!value) return null;
  return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default getPrettifiedNumber;
