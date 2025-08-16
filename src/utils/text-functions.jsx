import { gameNames } from '@poka/utils/games';
import {
  POSSESSIVE_CARD_NAMES,
  PLURAL_CARD_NAMES,
  HANDKIND,
  PAYMENT_DESCRIPTION,
  SUBSCRIPTION_TYPES,
} from '@utils/text-constants';

export function createTableTitleJsx(tableName) {
  const names = tableName?.split('_');
  return `${names?.[0]} από ${names?.[1]}`;
}
export function describeTime(secs) {
  const timeMap = {
    60: '1 λεπτό',
    90: '1,5 λεπτό',
    101: 'άνευ χρ.ορίου',
    120: '2 λεπτά',
    180: '3 λεπτά',
    300: '5 λεπτά',
  };

  return timeMap[secs] ?? `${secs}"`;
}
export function describeHand(submissionInfo) {
  if (!submissionInfo) return null;

  const { kind, desc } = submissionInfo;

  if (!desc) return <>{kind}</>;

  const [primary, secondary] = desc;
  const isPlural =
    kind === HANDKIND.TWO_PAIRS ||
    kind === HANDKIND.PAIR ||
    kind === HANDKIND.THREE_OF_A_KIND;

  const firstPart = isPlural
    ? ` ${PLURAL_CARD_NAMES[primary]}`
    : `${primary === 12 ? ' της ' : ' του '}${POSSESSIVE_CARD_NAMES[primary]}`;

  const secondPart = secondary ? ` με ${PLURAL_CARD_NAMES[secondary]}` : '';

  return (
    <>
      {kind}
      {firstPart}
      {secondPart}
    </>
  );
}
export function betPrompt(value, minBet, resta, error) {
  if (error) return <span>{error}</span>;
  switch (value) {
    case 0:
      return <> &apos;ΝΤΟΥΚΟΥ&apos;</>;
    case minBet:
      return (
        <>
          {minBet === resta ? 'Ρέστα' : 'ΜΕΣΑ στα'}
          <br />
          <span> {minBet.toLocaleString()}</span>
        </>
      );
    default:
      return (
        <>
          ΑΝΕΒΑΣΜΑ
          <br />
          <span> {(value - minBet).toLocaleString()}</span>
        </>
      );
  }
}
export function getNameAndLabel(name) {
  const gameMap = {
    [gameNames.GRAVEYARD]: {
      name: 'allDiscardedWins',
      label: 'ΞΕΣΚΑΡΤΑΡΙΣΜΑ ΑΝΩΤΑΤΟ ΦΥΛΛΟ',
    },
    [gameNames.MAMUT]: {
      name: 'mirrorWins',
      label: 'ΚΑΘΡΕΦΤΗΣ ΑΝΩΤΑΤΟ ΦΥΛΛΟ',
    },
    [gameNames.QUEEN]: {
      name: 'queens',
      label: 'ΜΠΑΛΑΝΤΕΡ ΚΑΙ ΟΙ ΝΤΑΜΕΣ',
    },
    [gameNames.TARGET]: {
      name: 'targetObligation',
      label: 'ΥΠΟΧΡΕΩΣΗ ΤΟ ΚΕΝΤΡIΚΟ ΧΑΡΤΙ',
    },
    [gameNames.CROSS]: {
      name: 'crossObligation',
      label: 'ΥΠΟΧΡΕΩΣΗ ΤΟ ΚΕΝΤΡIΚΟ ΧΑΡΤΙ',
    },
  };

  return gameMap[name] || { name: '', label: '' };
}
export function creataPaymentTags(title, email) {
  let amount, customerTrns, merchantTrns;
  const tags = [];

  switch (title) {
    case SUBSCRIPTION_TYPES.yearly.split('_')[0]:
      amount = 5000;
      customerTrns = PAYMENT_DESCRIPTION.yearly;
      merchantTrns = PAYMENT_DESCRIPTION.yearly + ` του χρήστη ${email}`;
      tags.push(PAYMENT_DESCRIPTION.yearly);
      break;
    case SUBSCRIPTION_TYPES.monthly.split('_')[0]:
      amount = 500;
      customerTrns = PAYMENT_DESCRIPTION.monthly;
      merchantTrns = PAYMENT_DESCRIPTION.monthly + ` του χρήστη ${email}`;
      tags.push(PAYMENT_DESCRIPTION.monthly);
      break;
    default:
      break;
  }
  return { amount, tags, customerTrns, merchantTrns };
}
