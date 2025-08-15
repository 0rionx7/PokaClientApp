import {
  BUILDERROWTITLE,
  DEALINGKIND,
  SPEAKINGORDER,
  TABLOS,
  WINNINGORDERS,
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
  winningOrder: WINNINGORDERS.KENTA_CHROMA,
  cardsInHand: 3,
  handCardsInPlay: ['2', '3'],
  faceDownIndexes: [],
  hats: 0,
  denials: 0,
  swaps: 0,
  obligation: false,
  skarto: false,
  dealing: DEALINGKIND.OLA_MAZI,
  speaks: SPEAKINGORDER.BY_SEAT,
  bomba: false,
});
const builderConfigs = Object.freeze([
  BUILDERROWTITLE.GAME,
  BUILDERROWTITLE.CARDS_IN_HAND,
  BUILDERROWTITLE.DEALING,
  BUILDERROWTITLE.DEALING_OPTIONS,
  BUILDERROWTITLE.HAND_CARDS_IN_PLAY,
  BUILDERROWTITLE.OPTIONS,
  BUILDERROWTITLE.WINNING_ORDER,
]);

export const initialGameDefaults = Object.freeze({
  ...builderDefaults,
  gameName: gameNames.MAMUT,
  tablo: TABLOS.MONO,
});

export const gameConfigs = Object.freeze({
  [gameNames.POKER]: {
    builderDefaults: {
      cardsInHand: 5,
      handCardsInPlay: ['5'],
      dealing: DEALINGKIND.ENA_ENA,
    },
    builderOptions: [
      BUILDERROWTITLE.GAME,
      BUILDERROWTITLE.CARDS_IN_HAND,
      BUILDERROWTITLE.DEALING,
      BUILDERROWTITLE.DEALING_OPTIONS,
      BUILDERROWTITLE.WINNING_ORDER,
      BUILDERROWTITLE.FACE_DOWN,
      BUILDERROWTITLE.SPEAKS,
    ],
  },
  [gameNames.QUEEN]: {
    builderDefaults: {
      winningOrder: WINNINGORDERS.TRIA_FOUL,
      cardsInHand: 5,
      handCardsInPlay: ['5'],
      faceDownIndexes: [4],
      dealing: DEALINGKIND.ENA_ENA,
    },
    builderOptions: [
      BUILDERROWTITLE.GAME,
      BUILDERROWTITLE.WINNING_ORDER,
      BUILDERROWTITLE.SPEAKS,
      BUILDERROWTITLE.EXTRA,
    ],
  },
  [gameNames.TEXAS_HOLDEM]: {
    builderDefaults: {
      winningOrder: WINNINGORDERS.KENTA_FOUL,
      cardsInHand: 2,
      handCardsInPlay: ['2'],
    },
    builderOptions: [BUILDERROWTITLE.GAME, BUILDERROWTITLE.WINNING_ORDER],
    boardClass: 'texas-holdem',
  },
  [gameNames.MAMUT]: {
    builderDefaults: {
      tablo: TABLOS.MONO,
    },
    builderOptions: [
      ...builderConfigs,
      BUILDERROWTITLE.EXTRA,
      BUILDERROWTITLE.TABLO,
    ],
    boardClass: 'mamut',
  },
  [gameNames.RAILROAD]: {
    builderDefaults: {
      railroadLength: 4,
      tablo: TABLOS.MONO,
    },
    builderOptions: [
      ...builderConfigs,
      BUILDERROWTITLE.TABLO,
      BUILDERROWTITLE.RAILROAD_LENGTH,
    ],
    boardClass: 'railroad',
  },
  [gameNames.CORNER]: {
    builderDefaults: {
      cornerLength: '3',
    },
    builderOptions: [...builderConfigs, BUILDERROWTITLE.CARDS_PER_LEG],
    boardClass: 'corner',
  },
  [gameNames.CROSS]: {
    builderOptions: [...builderConfigs, BUILDERROWTITLE.EXTRA],
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
      winningOrder: WINNINGORDERS.TRIA_FOUL,
    },
    builderOptions: [...builderConfigs],
    boardClass: 'pyramid',
  },
  [gameNames.CLOCK]: {
    builderOptions: [...builderConfigs],
    boardClass: 'clock',
  },
  [gameNames.TARGET]: {
    builderOptions: [...builderConfigs, BUILDERROWTITLE.EXTRA],
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
      BUILDERROWTITLE.GAME,
      BUILDERROWTITLE.WINNING_ORDER,
      BUILDERROWTITLE.EXTRA,
    ],
  },
  [gameNames.KOYKOS_MONOS]: {
    builderDefaults: {
      winningOrder: WINNINGORDERS.TRIA_FOUL,
      cardsInHand: 2,
      handCardsInPlay: ['2'],
      tablo: TABLOS.MONO,
    },
    builderOptions: [
      BUILDERROWTITLE.GAME,
      BUILDERROWTITLE.WINNING_ORDER,
      BUILDERROWTITLE.TABLO,
    ],
    boardClass: 'koukos',
  },
  [gameNames.KOYKOS_DIPLOS]: {
    builderDefaults: {
      winningOrder: WINNINGORDERS.TRIA_FOUL,
      cardsInHand: 3,
      handCardsInPlay: ['2', '3'],
      tablo: TABLOS.MONO,
    },
    builderOptions: [
      BUILDERROWTITLE.GAME,
      BUILDERROWTITLE.WINNING_ORDER,
      BUILDERROWTITLE.TABLO,
    ],
    boardClass: 'koukos',
  },
});
