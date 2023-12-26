export function createChipsStyle(cardsCount, top) {
  if (!top) return {};
  switch (cardsCount) {
    case 1:
      return { right: `calc( 3 * var(--card-width))` };
    case 2:
      return { right: `calc( 3.5 * var(--card-width))` };
    case 3:
      return { right: `calc( 4 * var(--card-width))` };
    case 4:
      return { right: `calc( 4.5 * var(--card-width))` };
    case 5:
      return { right: `calc( 5.1 * var(--card-width))` };
    case 6:
      return { right: `calc( 5.5 * var(--card-width))` };
    case 7:
      return { right: `calc( 6.3 * var(--card-width))` };
    default:
      return {};
  }
}
