export function createChipStyle(multiplier, index, startIndex) {
  const colorMap = {
    1: 'green',
    5: 'black',
    25: 'yellow',
    100: 'red',
    1000: 'blue',
  };

  const color = colorMap[multiplier] || 'purple';
  const style = {
    bottom: 3 * (index + (startIndex ?? 0)),
    gridArea: startIndex === undefined ? color : 'green',
  };
  return { color, style };
}
