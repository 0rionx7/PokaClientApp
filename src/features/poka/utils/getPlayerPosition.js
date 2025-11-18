export function getPlayerPosition(playersCount, seat) {
  const positions = {
    2: { 1: 'top' },
    3: { 1: 'left', 2: 'right' },
    4: { 1: 'left', 2: 'top', 3: 'right' },
    5: { 1: 'left', 2: 'top left', 3: 'top right', 4: 'right' },
    6: { 1: 'left', 2: 'left', 3: 'top', 4: 'right', 5: 'right' },
    7: {
      1: 'left',
      2: 'left',
      3: 'top left',
      4: 'top right',
      5: 'right',
      6: 'right'
    },
    8: {
      1: 'left',
      2: 'left',
      3: 'left',
      4: 'top',
      5: 'right',
      6: 'right',
      7: 'right'
    }
  }

  return positions[playersCount]?.[seat - 1] ?? ''
}
