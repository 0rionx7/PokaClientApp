import {
  builderRowTitle,
  dealingType,
  speakingOrder,
  tablos,
  winningOrder,
} from '@utils/text-constants.js';

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
  KOYKOS_DIPLOS: `ΚΟΥΚΟΣ ΔΙΠΛΟΣ / "ΑΒΟΛΟΝΤΕ"`,
});

export const builderDefaults = Object.freeze({
  winningOrder: winningOrder.KENTA_CHROMA,
  cardsInHand: 3,
  handCardsInPlay: ['2', '3'],
  faceDownIndexes: [],
  hats: 0,
  denies: 0,
  swaps: 0,
  obligation: false,
  skarto: false,
  dealing: dealingType.OLA_MAZI,
  speaks: speakingOrder.BY_SEAT,
  bomba: false,
});
const builderConfigs = Object.freeze([
  builderRowTitle.GAME,
  builderRowTitle.CARDS_IN_HAND,
  builderRowTitle.DEALING,
  builderRowTitle.DEALING_OPTIONS,
  builderRowTitle.HAND_CARDS_IN_PLAY,
  builderRowTitle.OPTIONS,
  builderRowTitle.WINNING_ORDER,
]);

export const initialGameDefaults = Object.freeze({
  ...builderDefaults,
  gameName: gameNames.MAMUT,
  tablo: tablos.MONO,
});

export const gameConfigs = Object.freeze({
  [gameNames.POKER]: {
    builderDefaults: {
      cardsInHand: 5,
      handCardsInPlay: ['5'],
      dealing: dealingType.ENA_ENA,
    },
    builderOptions: [
      builderRowTitle.GAME,
      builderRowTitle.CARDS_IN_HAND,
      builderRowTitle.DEALING,
      builderRowTitle.DEALING_OPTIONS,
      builderRowTitle.WINNING_ORDER,
      builderRowTitle.FACE_DOWN,
      builderRowTitle.SPEAKS,
    ],
  },
  [gameNames.QUEEN]: {
    builderDefaults: {
      winningOrder: winningOrder.TRIA_FOUL,
      cardsInHand: 5,
      handCardsInPlay: ['5'],
      faceDownIndexes: [4],
      dealing: dealingType.ENA_ENA,
    },
    builderOptions: [
      builderRowTitle.GAME,
      builderRowTitle.WINNING_ORDER,
      builderRowTitle.SPEAKS,
      builderRowTitle.EXTRA,
    ],
  },
  [gameNames.TEXAS_HOLDEM]: {
    builderDefaults: {
      winningOrder: winningOrder.KENTA_FOUL,
      cardsInHand: 2,
      handCardsInPlay: ['2'],
    },
    builderOptions: [builderRowTitle.GAME, builderRowTitle.WINNING_ORDER],
    boardClass: 'texas-holdem',
  },
  [gameNames.MAMUT]: {
    builderDefaults: {
      tablo: tablos.MONO,
    },
    builderOptions: [
      ...builderConfigs,
      builderRowTitle.EXTRA,
      builderRowTitle.TABLO,
    ],
    boardClass: 'mamut',
  },
  [gameNames.RAILROAD]: {
    builderDefaults: {
      railroadLength: 4,
      tablo: tablos.MONO,
    },
    builderOptions: [
      ...builderConfigs,
      builderRowTitle.TABLO,
      builderRowTitle.RAILROAD_LENGTH,
    ],
    boardClass: 'railroad',
  },
  [gameNames.CORNER]: {
    builderDefaults: {
      cornerLength: '3',
    },
    builderOptions: [...builderConfigs, builderRowTitle.CARDS_PER_LEG],
    boardClass: 'corner',
  },
  [gameNames.CROSS]: {
    builderOptions: [...builderConfigs, builderRowTitle.EXTRA],
    boardClass: 'cross',
  },
  [gameNames.TRIANGLE]: {
    builderOptions: [...builderConfigs],
    boardClass: 'triangle',
  },
  [gameNames.SQUARE]: {
    builderOptions: [...builderConfigs],
    boardClass: 'square',
  },
  [gameNames.PYRAMID]: {
    builderDefaults: {
      winningOrder: winningOrder.TRIA_FOUL,
    },
    builderOptions: [...builderConfigs],
    boardClass: 'pyramid',
  },
  [gameNames.CLOCK]: {
    builderOptions: [...builderConfigs],
    boardClass: 'clock',
  },
  [gameNames.TARGET]: {
    builderOptions: [...builderConfigs, builderRowTitle.EXTRA],
    boardClass: 'tit',
  },
  [gameNames.ELEVATOR]: {
    builderOptions: [...builderConfigs],
    boardClass: 'elevator',
  },
  [gameNames.GRAVEYARD]: {
    builderDefaults: {
      cardsInHand: 5,
      handCardsInPlay: [2, 3],
    },
    boardClass: 'graveyard',
    builderOptions: [
      builderRowTitle.GAME,
      builderRowTitle.WINNING_ORDER,
      builderRowTitle.EXTRA,
    ],
  },
  [gameNames.KOYKOS_MONOS]: {
    builderDefaults: {
      winningOrder: winningOrder.TRIA_FOUL,
      cardsInHand: 2,
      handCardsInPlay: ['2'],
      tablo: tablos.MONO,
    },
    builderOptions: [
      builderRowTitle.GAME,
      builderRowTitle.WINNING_ORDER,
      builderRowTitle.TABLO,
    ],
    boardClass: 'koukos',
  },
  [gameNames.KOYKOS_DIPLOS]: {
    builderDefaults: {
      winningOrder: winningOrder.TRIA_FOUL,
      cardsInHand: 3,
      handCardsInPlay: ['2', '3'],
      tablo: tablos.MONO,
    },
    builderOptions: [
      builderRowTitle.GAME,
      builderRowTitle.WINNING_ORDER,
      builderRowTitle.TABLO,
    ],
    boardClass: 'koukos',
  },
});
