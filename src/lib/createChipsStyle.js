export function createChipsStyle(cardsCount, top, left) {
  if (!top) return {};
  const side = left ? 'left' : 'right';
  switch (cardsCount) {
    case 1:
      return { [side]: `calc( 2.9 * var(--card-width))` };
    case 2:
      return { [side]: `calc( 3.3 * var(--card-width))` };
    case 3:
      return { [side]: `calc( 3.9 * var(--card-width))` };
    case 4:
      return { [side]: `calc( 4.3 * var(--card-width))` };
    case 5:
      return { [side]: `calc( 5.1 * var(--card-width))` };
    case 6:
      return { [side]: `calc( 5.5 * var(--card-width))` };
    case 7:
      return { [side]: `calc( 6.3 * var(--card-width))` };
    default:
      return {};
  }
}
