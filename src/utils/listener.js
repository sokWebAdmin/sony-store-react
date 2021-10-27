export const onKeyboardEventOnlyDigit = event => Number.isNaN(event.key * 1) &&
  event.preventDefault();
