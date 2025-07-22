export function colorClass(value) {
  let className = 'neutral';
  if (value) className = value > 0 ? 'possitive' : 'negative';
  return className;
}
export function isSeated(playerState) {
  return !playerState.sittingOut;
}
export function selectedCardIndexes(cards) {
  return cards.reduce((acc, curr, i) => {
    if (curr.selected) acc.push(i);
    return acc;
  }, []);
}
export function cardSelected(card) {
  return card.selected;
}
export function playerEntry(playerName) {
  return entry => entry.playerName === playerName;
}
export function updateAll(playerStates, update) {
  return playerStates.map(playerState => ({ ...playerState, ...update }));
}
export function revealCard(card) {
  return { ...card, faceUp: true };
}
export function unselectAll(card) {
  return { ...card, selected: false };
}
function descValue(cardA, cardB) {
  return cardB.value - cardA.value;
}
export function isMirror(tableCards, handCards) {
  tableCards = tableCards.slice().sort(descValue);
  handCards = handCards.slice().sort(descValue);
  return tableCards.every((card, i) => card.value === handCards[i].value);
}
export function sortPlayers(playerStates) {
  const inGameList = playerStates.filter(ps => !ps.sittingOut);
  const outOfGameList = playerStates.filter(ps => ps.sittingOut);
  return inGameList.concat(outOfGameList);
}
export function notEnoughCards(values, playersCount) {
  let tableCardsCount = 0;
  let handCardsCount = +values.cardsInHand;

  if (values.rowsIndexes) tableCardsCount = values.rowsIndexes.flat(1).length;
  else if (values.railroadLength) tableCardsCount = +values.railroadLength;

  if (values.hats) tableCardsCount += +values.hats;

  handCardsCount += values.skarto ? 1 : 0;
  handCardsCount += values.swap ? +values.swaps : 0;
  handCardsCount += values.deny ? +values.denies : 0;
  handCardsCount *= playersCount;
  return tableCardsCount + handCardsCount > 4 * (15 - +values.startingCard);
}
