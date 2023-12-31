import { tabloCount } from 'common/text-constants';
import { gameNames } from 'common/games';

export function createGameVariant({ showTitles, hiddenTitles, ...gameInfo }) {
  let rowsIndexes = [];

  if (gameInfo.cornerLength === '2') {
    rowsIndexes = [[2, 0], [1]];
    gameInfo.boardClass = 'corner 2';
  } else if (gameInfo.cornerLength === '4') {
    rowsIndexes = [[6, 0, 2, 4], [1], [3], [5]];
    gameInfo.boardClass = 'corner 4';
  }
  if (gameInfo.tablo === tabloCount.DIPLO)
    switch (gameInfo.gameName) {
      case gameNames.KOYKOS_MONOS:
      case gameNames.KOYKOS_DIPLOS:
        rowsIndexes = [
          [0, 1],
          [2, 3],
          [4, 5],
          [6, 7],
          [8, 9],
        ];
        break;
      case gameNames.MAMUT:
        rowsIndexes = [
          [0, 2, 4],
          [1, 3, 5],
        ];
        break;
      case gameNames.RAILROAD:
        rowsIndexes = [[], []];
        for (let i = 0; i < 2 * gameInfo.railroadLength; i++) {
          rowsIndexes[i % 2 === 0 ? 0 : 1].push(i);
        }
        break;
      default:
        break;
    }
  else if (gameInfo.railroadLength)
    rowsIndexes = [[...Array(+gameInfo.railroadLength).keys()]];

  if (!rowsIndexes.length) rowsIndexes = gameInfo.rowsIndexes;
  return { ...gameInfo, rowsIndexes, startingCard: +gameInfo.startingCard };
}
