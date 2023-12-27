export function createChipsStyle(cardsCount, top, left) {
  if (!top) return {};
  switch (cardsCount) {
    case 1:
      return { [left ? 'left' : 'right']: `calc( 2.9 * var(--card-width))` };
    case 2:
      return { [left ? 'left' : 'right']: `calc( 3.3 * var(--card-width))` };
    case 3:
      return { [left ? 'left' : 'right']: `calc( 3.9 * var(--card-width))` };
    case 4:
      return { [left ? 'left' : 'right']: `calc( 4.3 * var(--card-width))` };
    case 5:
      return { [left ? 'left' : 'right']: `calc( 5.1 * var(--card-width))` };
    case 6:
      return { [left ? 'left' : 'right']: `calc( 5.5 * var(--card-width))` };
    case 7:
      return { [left ? 'left' : 'right']: `calc( 6.3 * var(--card-width))` };
    default:
      return {};
  }
}
