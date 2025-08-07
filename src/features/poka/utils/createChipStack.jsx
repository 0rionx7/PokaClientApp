import Chip from '@poka/components/table/Chip';

function createChipJsx(count, multiplier, startIndex) {
  return Array(count)
    .fill('')
    .map((_, i) => (
      <Chip
        multiplier={multiplier}
        index={i}
        startIndex={startIndex}
        key={multiplier + i}
      />
    ));
}

export function createChipStack(amount, chip) {
  if (amount < 0 || amount > 1200000 * chip) return [];
  const reds = Math.floor(amount / (100 * chip));
  const yellows = Math.floor((amount - reds * 100 * chip) / (25 * chip));
  const blacks = Math.floor(
    (amount - reds * 100 * chip - yellows * 25 * chip) / (5 * chip)
  );
  const greens = Math.floor(
    (amount - reds * 100 * chip - yellows * 25 * chip - blacks * 5 * chip) /
      chip
  );
  let redChips,
    blueChips = [],
    purpleChips = [],
    yellowChips = [];
  if (reds > 40) {
    const blues = Math.floor(reds / 10);
    if (blues > 40) {
      const purples = Math.floor(blues / 10);
      purpleChips = createChipJsx(purples, 10000);
      blueChips = createChipJsx(
        Math.floor((amount % (10000 * chip)) / (1000 * chip)),
        1000
      );
      redChips = createChipJsx(
        Math.floor((amount % (1000 * chip)) / (100 * chip)),
        100
      );
    } else {
      blueChips = createChipJsx(blues, 1000);
      redChips = createChipJsx(
        Math.floor((amount % (1000 * chip)) / (100 * chip)),
        100
      );
    }
  } else redChips = createChipJsx(reds, 100);

  if (blueChips.length)
    yellowChips = createChipJsx(yellows, 25, greens + blacks);
  else yellowChips = createChipJsx(yellows, 25);
  const blackChips = createChipJsx(blacks, 5, greens);
  const greenChips = createChipJsx(greens, 1);

  return [
    ...purpleChips,
    ...blueChips,
    ...redChips,
    ...greenChips,
    ...blackChips,
    ...yellowChips,
  ];
}
