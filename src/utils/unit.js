export const toCurrencyString = number =>
  number.toLocaleString(undefined, { minimumFractionDigits: 0 })