import { gameNames } from 'src/common/text-constants';

import { tabloCount } from 'src/common/text-constants';

export function selectedCardsIndexes(cards) {
  return cards.reduce((acc, curr, i) => {
    if (curr.selected) acc.push(i);
    return acc;
  }, []);
}
export function selectedCard(card) {
  return card.selected;
}
export function playerEntry(playerName) {
  return entry => entry.playerName === playerName;
}
export function updateAll(playersStateList, update) {
  return playersStateList.map(playerState => ({ ...playerState, ...update }));
}
export function isHere(playerState) {
  return !playerState.sittingOut;
}
export function faceUp(card) {
  return { ...card, faceUp: true };
}
export function notEnoughCards(game, playersCount) {
  let tableCardsCount = 0;
  let handCardsCount = +game.cardsInHand;

  if (game.rowsIndexes) tableCardsCount = game.rowsIndexes.flat(1).length;
  else if (game.railroadLength) tableCardsCount = +game.railroadLength;

  if (game.hats) tableCardsCount += +game.hats;

  handCardsCount += game.skarto ? 1 : 0;
  handCardsCount += game.swap ? +game.swaps : 0;
  handCardsCount += game.deny ? +game.denies : 0;
  handCardsCount *= playersCount;
  return tableCardsCount + handCardsCount > 4 * (15 - +game.startingCard);
}
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
    rowsIndexes = [
      Array(+gameInfo.railroadLength)
        .fill('')
        .map((_, i) => i),
    ];

  if (!rowsIndexes.length) rowsIndexes = gameInfo.rowsIndexes;
  return { ...gameInfo, rowsIndexes };
}
function descValue(cardA, cardB) {
  return cardB.value - cardA.value;
}
export function isMirror(tableCards, handCards) {
  tableCards = tableCards.slice().sort(descValue);
  handCards = handCards.slice().sort(descValue);
  return tableCards.every((card, i) => card.value === handCards[i].value);
}
export function inGameFistList(playersStateList) {
  const inGameList = playersStateList.filter(ps => !ps.sittingOut);
  const outOfGameList = playersStateList.filter(ps => ps.sittingOut);
  return inGameList.concat(outOfGameList);
}
