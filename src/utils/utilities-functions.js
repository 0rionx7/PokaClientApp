export function colorClass(value) {
  let className = 'neutral';
  if (value) className = value > 0 ? 'possitive' : 'negative';
  return className;
}
export function isSitting(playerState) {
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
export function createCode(length) {
  let password = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < length) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    counter += 1;
  }
  return password;
}
