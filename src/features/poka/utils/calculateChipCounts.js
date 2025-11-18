export const calculateChipCounts = (amount, chip) => {
  const denominations = [
    { key: 'red', value: 100 },
    { key: 'yellow', value: 25 },
    { key: 'black', value: 5 },
    { key: 'green', value: 1 }
  ]

  const result = { smalls: {} }
  let remaining = amount

  for (const { key, value } of denominations) {
    const unitValue = value * chip
    const count = Math.floor(remaining / unitValue)
    if (count > 40) {
      let blue = Math.floor(count / 10)
      result['blue'] = blue
      if (blue > 40) {
        result['purple'] = Math.floor(blue / 10)
        result['blue'] = Math.floor((amount % (10000 * chip)) / (1000 * chip))
      }
      result['red'] = Math.floor((amount % (1000 * chip)) / (100 * chip))
    } else {
      key === 'red' ? (result[key] = count) : (result.smalls[key] = count)
    }

    remaining -= count * unitValue
  }

  let chipInfos = { green: [] }
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'object') {
      for (const [key, count] of Object.entries(value)) {
        chipInfos.green.push(...Array(count).fill(key))
      }
    } else {
      chipInfos[key] = Array(value).fill(key)
    }
  }

  return Object.entries(chipInfos)
}
