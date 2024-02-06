import {
  builderTitles,
  dealingOrders,
  speaking,
  tabloCount,
  winningOrders,
} from './text-constants.js';

export const gameNames = {
  RAILROAD: 'ΣΙΔΗΡΟΔΡΟΜΟΣ',
  MAMUT: 'ΜΑΜΟΥΘ',
  TRIANGLE: 'ΤΡΙΓΩΝΟ',
  SQUARE: 'ΤΕΤΡΑΓΩΝΟ',
  KOYKOS_MONOS: `ΚΟΥΚΟΣ ΜΟΝΟΣ / "ΠΑΖ ΑΒΟΛΟΝΤΕ"`,
  KOYKOS_DIPLOS: `ΚΟΥΚΟΣ ΔΙΠΛΟΣ / "ΑΒΟΛΟΝΤΕ"`,
  POKER: 'ΠΟΚΕΡ',
  TEXAS_HOLDEM: 'TEXAS HOLDEM',
  TARGET: 'ΣΤΟΧΟΣ',
  CLOCK: 'ΡΟΛΟΙ',
  ELEVATOR: 'ΑΝΣΑΝΣΕΡ',
  GRAVEYARD: 'ΝΕΚΡΟΤΑΦΕΙΟ',
  CROSS: 'ΣΤΑΥΡΟΣ',
  CORNER: 'ΓΩΝΙΑ',
  QUEEN: 'FOLLOW THE QUEEN',
  PYRAMID: 'ΠΥΡΑΜΙΔΑ',
};

export const builderDefaults = {
  winningOrder: winningOrders.KENTA_CHROMA,
  cardsInHand: 3,
  handCardsInPlay: ['2', '3'],
  faceDownIndexes: ['0', '1', '2', '3', '4', '5', '6'],
  hat: false,
  hats: 0,
  obligation: false,
  skarto: false,
  deny: false,
  denies: 0,
  swap: false,
  swaps: 0,
  dealing: dealingOrders.OLA_MAZI,
  speaks: speaking.BY_VALUE,
  bomba: false,
};

export const games = [
  {
    gameName: gameNames.POKER,
    builderDefaults: {
      cardsInHand: 5,
      faceDownIndexes: ['4'],
      handCardsInPlay: ['5'],
      dealing: dealingOrders.ENA_ENA,
    },
  },
  {
    gameName: gameNames.QUEEN,
    builderDefaults: {
      winningOrder: winningOrders.TRIA_FOUL,
      cardsInHand: 5,
      handCardsInPlay: ['5'],
      faceDownIndexes: ['4'],
      dealing: dealingOrders.ENA_ENA,
    },
    showTitles: [
      builderTitles.GAME,
      builderTitles.WINNING_ORDER,
      builderTitles.FACE_DOWN,
      builderTitles.SPEAKS,
      builderTitles.EXTRA,
    ],
  },
  {
    gameName: gameNames.TEXAS_HOLDEM,
    rowsIndexes: [[0, 1, 2, 3, 4]],
    builderDefaults: {
      winningOrder: winningOrders.KENTA_FOUL,
      cardsInHand: 2,
      handCardsInPlay: ['2'],
    },
    boardClass: 'texas-holdem',
    showTitles: [builderTitles.GAME, builderTitles.WINNING_ORDER],
  },
  {
    gameName: gameNames.MAMUT,
    rowsIndexes: [[0, 1, 2]],
    builderDefaults: { tablo: tabloCount.MONO },
    boardClass: 'mamut',
  },
  {
    gameName: gameNames.RAILROAD,
    builderDefaults: { railroadLength: 4, tablo: tabloCount.MONO },
    boardClass: 'railroad',
  },
  {
    gameName: gameNames.CORNER,
    rowsIndexes: [[4, 0, 2], [1], [3]],
    builderDefaults: { cornerLength: '3' },
    boardClass: 'corner 3',
  },
  {
    gameName: gameNames.CROSS,
    rowsIndexes: [[0], [1, 4, 2], [3]],
    boardClass: 'cross',
  },
  {
    gameName: gameNames.TRIANGLE,
    rowsIndexes: [[0], [3, 5], [1, 4, 2]],
    boardClass: 'triangle',
  },
  {
    gameName: gameNames.SQUARE,
    rowsIndexes: [
      [0, 2],
      [3, 1],
    ],
    boardClass: 'square',
  },
  {
    gameName: gameNames.PYRAMID,
    rowsIndexes: [[9], [7, 8], [4, 5, 6], [0, 1, 2, 3]],
    builderDefaults: { winningOrder: winningOrders.TRIA_FOUL },
    boardClass: 'pyramid',
  },
  {
    gameName: gameNames.CLOCK,
    rowsIndexes: [
      [2, 4],
      [0, 1],
      [5, 3],
    ],
    boardClass: 'clock',
  },
  {
    gameName: gameNames.TARGET,
    rowsIndexes: [
      [2, 4],
      [0, 6, 1],
      [5, 3],
    ],
    boardClass: 'tit',
  },
  {
    gameName: gameNames.ELEVATOR,
    rowsIndexes: [
      [0, 3],
      [1, 6, 4],
      [2, 5],
    ],
    boardClass: 'elevator',
  },
  {
    gameName: gameNames.GRAVEYARD,
    rowsIndexes: [
      [0, 2, 4, 6, 8],
      [1, 3, 5, 7, 9],
    ],
    builderDefaults: {
      cardsInHand: 5,
      handCardsInPlay: [2, 3],
    },
    boardClass: 'graveyard',
    showTitles: [
      builderTitles.GAME,
      builderTitles.WINNING_ORDER,
      builderTitles.EXTRA,
    ],
  },
  {
    gameName: gameNames.KOYKOS_MONOS,
    rowsIndexes: [[0], [1], [2], [3], [4]],
    builderDefaults: {
      winningOrder: winningOrders.TRIA_FOUL,
      cardsInHand: 2,
      handCardsInPlay: ['2'],
      tablo: tabloCount.MONO,
    },
    boardClass: 'koukos',
    showTitles: [
      builderTitles.GAME,
      builderTitles.WINNING_ORDER,
      builderTitles.TABLO,
    ],
  },
  {
    gameName: gameNames.KOYKOS_DIPLOS,
    rowsIndexes: [[0], [1], [2], [3], [4]],
    builderDefaults: {
      winningOrder: winningOrders.TRIA_FOUL,
      cardsInHand: 3,
      handCardsInPlay: ['2', '3'],
      tablo: tabloCount.MONO,
    },
    boardClass: 'koukos',
    showTitles: [
      builderTitles.GAME,
      builderTitles.WINNING_ORDER,
      builderTitles.TABLO,
    ],
  },
];
