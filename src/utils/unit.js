export const toCurrencyString = number =>
  number.toLocaleString(undefined, { minimumFractionDigits: 0 });

export const truncate = (text, count) => {
  if (text.includes('\n') && text.indexOf('\n') < count) {
    return text.substr(0, text.indexOf('\n')) + '...';
  }

  if (text.length >= count) {
    return text.substr(0, count) + '...';
  }

  return text;
};