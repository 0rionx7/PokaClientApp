export function getColorClass(value) {
  return value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral'
}
export function isSitting(playerState) {
  return !playerState.sittingOut
}
export function playerStateOf(playerName) {
  return (entry) => entry.playerName === playerName
}
export function updateAll(playerStates, update) {
  return playerStates.map((playerState) => ({ ...playerState, ...update }))
}
export function isMirror(handCards, tableCards) {
  const descValue = (cardA, cardB) => cardB.value - cardA.value
  const sortedTableCards = tableCards.toSorted(descValue)
  const sortedHandCards = handCards.toSorted(descValue)
  return sortedTableCards.every((card, i) => card.value === sortedHandCards[i].value)
}
export function createCode(length) {
  let password = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let counter = 0
  while (counter < length) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
    counter += 1
  }
  return password
}
export const formatNumber = (n) => n.toLocaleString()

export function cn(...inputs) {
  let className = ''
  for (const input of inputs) {
    if (input) {
      if (typeof input === 'object') {
        for (const [key, value] of Object.entries(input)) if (value) className += ` ${key}`
      } else className += ` ${input}`
    }
  }
  return className
}
