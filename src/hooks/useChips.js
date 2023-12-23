import Chip from 'components/table/Chip';

function createChipJsx(count, multiplier, greens = 0) {
  return Array(count)
    .fill('')
    .map((_, i) => (
      <Chip multiplier={multiplier} index={i + greens} key={multiplier + i} />
    ));
}

const useChips = (amount, chip) => {
  if (amount < 0) return [];
  const reds = Math.floor(amount / (100 * chip));
  const blues = Math.floor((amount - reds * 100 * chip) / (25 * chip));
  const blacks = Math.floor(
    (amount - reds * 100 * chip - blues * 25 * chip) / (5 * chip)
  );
  const greens = Math.floor(
    (amount - reds * 100 * chip - blues * 25 * chip - blacks * 5 * chip) / chip
  );
  let redChips,
    yellowChips = [],
    purpleChips = [];
  if (reds > 40) {
    const yellows = Math.floor(reds / 10);
    if (yellows > 40) {
      const purples = Math.floor(yellows / 10);
      purpleChips = createChipJsx(purples, 10000);
      yellowChips = createChipJsx(
        Math.floor((amount % (10000 * chip)) / (1000 * chip)),
        1000
      );
      redChips = createChipJsx(
        Math.floor((amount % (1000 * chip)) / (100 * chip)),
        100
      );
    } else {
      yellowChips = createChipJsx(yellows, 1000);
      redChips = createChipJsx(
        Math.floor((amount % (1000 * chip)) / (100 * chip)),
        100
      );
    }
  } else redChips = createChipJsx(reds, 100);

  const blueChips = createChipJsx(blues, 25);
  const blackChips = createChipJsx(blacks, 5, greens);
  const greenChips = createChipJsx(greens, 1);

  return [
    ...purpleChips,
    ...yellowChips,
    ...redChips,
    ...blueChips,
    ...greenChips,
    ...blackChips,
  ];
};

export default useChips;
