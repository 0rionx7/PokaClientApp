import { gameNames } from '@poka/utils/games';
import {
  PRIMARYCARDNAMES,
  SECONDARYCARDNAMES,
  HANDKIND,
  PAYMENTDESCRIPTION,
  SUBSCRIPTIONTYPES,
} from '@utils/text-constants';

export function createTableTitleJsx(tableName) {
  const names = tableName?.split('_');
  return `${names?.[0]} από ${names?.[1]}`;
}
export function describeTime(secs) {
  switch (secs) {
    case 60:
      return '1 λεπτό';
    case 90:
      return '1,5 λεπτό';
    case 101:
      return 'άνευ χρ.ορίου';
    case 120:
      return '2 λεπτά';
    case 180:
      return '3 λεπτά';
    case 300:
      return '5 λεπτά';
    default:
      return secs + '"';
  }
}
export function describeHand(submissionInfo, submitBtn) {
  if (!submissionInfo) return '';
  if (!submissionInfo.desc)
    return (
      <>
        {submitBtn && (
          <>
            ΥΠΟΒΟΛΗ <br />
          </>
        )}
        {submissionInfo.kind}
      </>
    );
  let firstPart;
  if (
    submissionInfo.kind === HANDKIND.TWO_PAIRS ||
    submissionInfo.kind === HANDKIND.PAIR ||
    submissionInfo.kind === HANDKIND.THREE_OF_A_KIND
  )
    firstPart = ' ' + SECONDARYCARDNAMES[submissionInfo.desc[0]];
  else
    firstPart =
      (submissionInfo.desc[0] === 12 ? ' της ' : ' του ') +
      PRIMARYCARDNAMES[submissionInfo.desc[0]];

  return (
    <>
      {submitBtn && (
        <>
          ΥΠΟΒΟΛΗ <br />
        </>
      )}
      {submissionInfo.kind} {firstPart}
      {submitBtn && <br />}
      {submissionInfo.desc[1]
        ? ` με ${SECONDARYCARDNAMES[submissionInfo.desc[1]]}`
        : ''}
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
  switch (name) {
    case gameNames.GRAVEYARD:
      return { name: 'allDiscardedWins', label: 'ΞΕΣΚΑΡΤΑΡΙΣΜΑ ΑΝΩΤΑΤΟ ΦΥΛΛΟ' };
    case gameNames.MAMUT:
      return { name: 'mirrorWins', label: 'ΚΑΘΡΕΦΤΗΣ ΑΝΩΤΑΤΟ ΦΥΛΛΟ' };
    case gameNames.QUEEN:
      return { name: 'queens', label: 'ΜΠΑΛΑΝΤΕΡ ΚΑΙ ΟΙ ΝΤΑΜΕΣ' };
    case gameNames.TARGET:
      return { name: 'targetObligation', label: 'ΥΠΟΧΡΕΩΣΗ ΤΟ ΚΕΝΤΡIΚΟ ΧΑΡΤΙ' };
    case gameNames.CROSS:
      return { name: 'crossObligation', label: 'ΥΠΟΧΡΕΩΣΗ ΤΟ ΚΕΝΤΡIΚΟ ΧΑΡΤΙ' };
    default:
      return { name: '', label: '' };
  }
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
