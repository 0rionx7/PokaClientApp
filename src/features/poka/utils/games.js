import {
  BUILDER_ROW_TITLE,
  DEALING_KIND,
  SPEAKING_ORDER,
  TABLOS,
  WINNING_ORDERS
} from '@utils/text-constants.js'

export const DEAL_DELAY = 50

export const gameNames = Object.freeze({
  POKER: 'ΠΟΚΕΡ',
  TEXAS_HOLDEM: 'TEXAS HOLDEM',
  QUEEN: 'FOLLOW THE QUEEN',
  RAILROAD: 'ΣΙΔΗΡΟΔΡΟΜΟΣ',
  MAMUT: 'ΜΑΜΟΥΘ',
  TRIANGLE: 'ΤΡΙΓΩΝΟ',
  SQUARE: 'ΤΕΤΡΑΓΩΝΟ',
  CORNER: 'ΓΩΝΙΑ',
  CROSS: 'ΣΤΑΥΡΟΣ',
  TARGET: 'ΣΤΟΧΟΣ',
  CLOCK: 'ΡΟΛΟΙ',
  ELEVATOR: 'ΑΝΣΑΝΣΕΡ',
  PYRAMID: 'ΠΥΡΑΜΙΔΑ',
  GRAVEYARD: 'ΝΕΚΡΟΤΑΦΕΙΟ',
  KOYKOS_MONOS: `ΚΟΥΚΟΣ ΜΟΝΟΣ / "ΠΑΖ ΑΒΟΛΟΝΤΕ"`,
  KOYKOS_DIPLOS: `ΚΟΥΚΟΣ ΔΙΠΛΟΣ / "ΑΒΟΛΟΝΤΕ"`
})

export const builderDefaults = Object.freeze({
  winningOrder: WINNING_ORDERS.KENTA_CHROMA,
  cardsInHand: 3,
  handCardsInPlay: ['2', '3'],
  faceDownIndexes: [],
  hats: 0,
  denials: 0,
  swaps: 0,
  obligation: false,
  skarto: false,
  dealing: DEALING_KIND.OLA_MAZI,
  speaks: SPEAKING_ORDER.BY_SEAT,
  bomba: false
})
const builderConfigs = Object.freeze([
  BUILDER_ROW_TITLE.GAME,
  BUILDER_ROW_TITLE.CARDS_IN_HAND,
  BUILDER_ROW_TITLE.DEALING,
  BUILDER_ROW_TITLE.DEALING_OPTIONS,
  BUILDER_ROW_TITLE.HAND_CARDS_IN_PLAY,
  BUILDER_ROW_TITLE.OPTIONS,
  BUILDER_ROW_TITLE.WINNING_ORDER
])

export const initialGameDefaults = Object.freeze({
  ...builderDefaults,
  gameName: gameNames.MAMUT,
  tablo: TABLOS.MONO
})

export const gameConfigs = Object.freeze({
  [gameNames.POKER]: {
    builderDefaults: {
      cardsInHand: 5,
      handCardsInPlay: ['5'],
      dealing: DEALING_KIND.ENA_ENA
    },
    builderOptions: [
      BUILDER_ROW_TITLE.GAME,
      BUILDER_ROW_TITLE.CARDS_IN_HAND,
      BUILDER_ROW_TITLE.DEALING,
      BUILDER_ROW_TITLE.DEALING_OPTIONS,
      BUILDER_ROW_TITLE.WINNING_ORDER,
      BUILDER_ROW_TITLE.FACE_DOWN,
      BUILDER_ROW_TITLE.SPEAKS
    ]
  },
  [gameNames.QUEEN]: {
    builderDefaults: {
      winningOrder: WINNING_ORDERS.TRIA_FOUL,
      cardsInHand: 5,
      handCardsInPlay: ['5'],
      faceDownIndexes: [4],
      dealing: DEALING_KIND.ENA_ENA
    },
    builderOptions: [
      BUILDER_ROW_TITLE.GAME,
      BUILDER_ROW_TITLE.WINNING_ORDER,
      BUILDER_ROW_TITLE.SPEAKS,
      BUILDER_ROW_TITLE.EXTRA
    ]
  },
  [gameNames.TEXAS_HOLDEM]: {
    builderDefaults: {
      winningOrder: WINNING_ORDERS.KENTA_FOUL,
      cardsInHand: 2,
      handCardsInPlay: ['2']
    },
    builderOptions: [BUILDER_ROW_TITLE.GAME, BUILDER_ROW_TITLE.WINNING_ORDER],
    boardClass: 'texas-holdem'
  },
  [gameNames.MAMUT]: {
    builderDefaults: {
      tablo: TABLOS.MONO
    },
    builderOptions: [...builderConfigs, BUILDER_ROW_TITLE.EXTRA, BUILDER_ROW_TITLE.TABLO],
    boardClass: 'mamut'
  },
  [gameNames.RAILROAD]: {
    builderDefaults: {
      railroadLength: 4,
      tablo: TABLOS.MONO
    },
    builderOptions: [...builderConfigs, BUILDER_ROW_TITLE.TABLO, BUILDER_ROW_TITLE.RAILROAD_LENGTH],
    boardClass: 'railroad'
  },
  [gameNames.CORNER]: {
    builderDefaults: {
      cornerLength: '3'
    },
    builderOptions: [...builderConfigs, BUILDER_ROW_TITLE.CARDS_PER_LEG],
    boardClass: 'corner'
  },
  [gameNames.CROSS]: {
    builderOptions: [...builderConfigs, BUILDER_ROW_TITLE.EXTRA],
    boardClass: 'cross'
  },
  [gameNames.TRIANGLE]: {
    builderOptions: [...builderConfigs],
    boardClass: 'triangle'
  },
  [gameNames.SQUARE]: {
    builderOptions: [...builderConfigs],
    boardClass: 'square'
  },
  [gameNames.PYRAMID]: {
    builderDefaults: {
      winningOrder: WINNING_ORDERS.TRIA_FOUL
    },
    builderOptions: [...builderConfigs],
    boardClass: 'pyramid'
  },
  [gameNames.CLOCK]: {
    builderOptions: [...builderConfigs],
    boardClass: 'clock'
  },
  [gameNames.TARGET]: {
    builderOptions: [...builderConfigs, BUILDER_ROW_TITLE.EXTRA],
    boardClass: 'tit'
  },
  [gameNames.ELEVATOR]: {
    builderOptions: [...builderConfigs],
    boardClass: 'elevator'
  },
  [gameNames.GRAVEYARD]: {
    builderDefaults: {
      cardsInHand: 5,
      handCardsInPlay: [2, 3]
    },
    boardClass: 'graveyard',
    builderOptions: [
      BUILDER_ROW_TITLE.GAME,
      BUILDER_ROW_TITLE.WINNING_ORDER,
      BUILDER_ROW_TITLE.EXTRA
    ]
  },
  [gameNames.KOYKOS_MONOS]: {
    builderDefaults: {
      winningOrder: WINNING_ORDERS.TRIA_FOUL,
      cardsInHand: 2,
      handCardsInPlay: ['2'],
      tablo: TABLOS.MONO
    },
    builderOptions: [
      BUILDER_ROW_TITLE.GAME,
      BUILDER_ROW_TITLE.WINNING_ORDER,
      BUILDER_ROW_TITLE.TABLO
    ],
    boardClass: 'koukos'
  },
  [gameNames.KOYKOS_DIPLOS]: {
    builderDefaults: {
      winningOrder: WINNING_ORDERS.TRIA_FOUL,
      cardsInHand: 3,
      handCardsInPlay: ['2', '3'],
      tablo: TABLOS.MONO
    },
    builderOptions: [
      BUILDER_ROW_TITLE.GAME,
      BUILDER_ROW_TITLE.WINNING_ORDER,
      BUILDER_ROW_TITLE.TABLO
    ],
    boardClass: 'koukos'
  }
})
