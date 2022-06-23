const bigNumberFormatter = (bigNumber: number) => {
  return new Intl.NumberFormat('ru-RU').format(bigNumber);
};

export default bigNumberFormatter;
