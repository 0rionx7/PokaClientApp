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
