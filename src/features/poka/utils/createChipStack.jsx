import { getChipStyle } from '@poka/utils/getChipStyle';

function calculateChipCounts(amount, chip) {
  const denominations = [
    { key: 'reds', value: 100 },
    { key: 'yellows', value: 25 },
    { key: 'blacks', value: 5 },
    { key: 'greens', value: 1 },
  ];

  const result = {};
  let remaining = amount;

  for (const { key, value } of denominations) {
    const unitValue = value * chip;
    result[key] = Math.floor(remaining / unitValue);
    remaining -= result[key] * unitValue;
  }

  return result;
}

export function createChipStack(amount, chip) {
  function createChipJsx(count, multiplier, startIndex) {
    return Array.from({ length: count }, (_, i) => {
      const { color, style } = getChipStyle(multiplier, i, startIndex);
      const value = multiplier * chip;
      const displayValue = value >= 1000 ? `${value / 1000}K` : value;

      return (
        <div
          key={`${multiplier}-${i}`}
          className={`chip ${color}`}
          style={style}
        >
          <span>{displayValue}</span>
        </div>
      );
    });
  }
  if (amount < 0 || amount > 1_200_000 * chip) return [];

  const { reds, yellows, blacks, greens } = calculateChipCounts(amount, chip);

  let purpleChips = [],
    blueChips = [],
    redChips = [];

  if (reds > 40) {
    const blues = Math.floor(reds / 10);

    if (blues > 40) {
      const purples = Math.floor(blues / 10);
      purpleChips = createChipJsx(purples, 10000);
      blueChips = createChipJsx(
        Math.floor((amount % (10000 * chip)) / (1000 * chip)),
        1000,
      );
    } else {
      blueChips = createChipJsx(blues, 1000);
    }

    redChips = createChipJsx(
      Math.floor((amount % (1000 * chip)) / (100 * chip)),
      100,
    );
  } else {
    redChips = createChipJsx(reds, 100);
  }

  const greenChips = createChipJsx(greens, 1);
  const blackChips = createChipJsx(blacks, 5, greens);
  const yellowChips = createChipJsx(yellows, 25, greens + blacks);

  return [
    ...purpleChips,
    ...blueChips,
    ...redChips,
    ...greenChips,
    ...blackChips,
    ...yellowChips,
  ];
}
