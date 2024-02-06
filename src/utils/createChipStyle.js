export function createChipStyle(multiplier, index, startIndex) {
  const color =
    multiplier === 1
      ? 'green'
      : multiplier === 5
      ? 'black'
      : multiplier === 25
      ? 'yellow'
      : multiplier === 100
      ? 'red'
      : multiplier === 1000
      ? 'blue'
      : 'purple';
  const style = {
    bottom: 3 * (index + (startIndex ?? 0)) + 'px',
    gridArea: startIndex === undefined ? color : 'green',
  };
  return { color, style };
}
