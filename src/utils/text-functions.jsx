import { gameNames } from '@poka/utils/games';
import {
  POSSESSIVECARDNAMES,
  PLURALCARDNAMES,
  HANDKIND,
  PAYMENTDESCRIPTION,
  SUBSCRIPTIONTYPES,
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
    ? ` ${PLURALCARDNAMES[primary]}`
    : `${primary === 12 ? ' της ' : ' του '}${POSSESSIVECARDNAMES[primary]}`;

  const secondPart = secondary ? ` με ${PLURALCARDNAMES[secondary]}` : '';

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
    case SUBSCRIPTIONTYPES.yearly.split('_')[0]:
      amount = 5000;
      customerTrns = PAYMENTDESCRIPTION.yearly;
      merchantTrns = PAYMENTDESCRIPTION.yearly + ` του χρήστη ${email}`;
      tags.push(PAYMENTDESCRIPTION.yearly);
      break;
    case SUBSCRIPTIONTYPES.monthly.split('_')[0]:
      amount = 500;
      customerTrns = PAYMENTDESCRIPTION.monthly;
      merchantTrns = PAYMENTDESCRIPTION.monthly + ` του χρήστη ${email}`;
      tags.push(PAYMENTDESCRIPTION.monthly);
      break;
    default:
      break;
  }
  return { amount, tags, customerTrns, merchantTrns };
}
