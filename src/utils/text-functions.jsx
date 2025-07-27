import {
  primaryCardNames,
  secondaryCardNames,
  gameName,
  handKind,
  paymentDescription,
  subscriptionOption,
} from 'utils/text-constants';

export function createTableTitle(tableName) {
  const names = tableName?.split('_');
  return (
    <div>
      {names?.[0]} <span> από </span> {names?.[1]}
    </div>
  );
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
    submissionInfo.kind === handKind.TWO_PAIRS ||
    submissionInfo.kind === handKind.PAIR ||
    submissionInfo.kind === handKind.THREE_OF_A_KIND
  )
    firstPart = ' ' + secondaryCardNames[submissionInfo.desc[0]];
  else
    firstPart =
      (submissionInfo.desc[0] === 12 ? ' της ' : ' του ') +
      primaryCardNames[submissionInfo.desc[0]];

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
        ? ` με ${secondaryCardNames[submissionInfo.desc[1]]}`
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
    case gameName.GRAVEYARD:
      return { name: 'allDiscardedWins', label: 'ΞΕΣΚΑΡΤΑΡΙΣΜΑ ΑΝΩΤΑΤΟ ΦΥΛΛΟ' };
    case gameName.MAMUT:
      return { name: 'mirrorWins', label: 'ΚΑΘΡΕΦΤΗΣ ΑΝΩΤΑΤΟ ΦΥΛΛΟ' };
    case gameName.QUEEN:
      return { name: 'queens', label: 'ΜΠΑΛΑΝΤΕΡ ΚΑΙ ΟΙ ΝΤΑΜΕΣ' };
    case gameName.TARGET:
      return { name: 'targetObligation', label: 'ΥΠΟΧΡΕΩΣΗ ΤΟ ΚΕΝΤΡIΚΟ ΧΑΡΤΙ' };
    case gameName.CROSS:
      return { name: 'crossObligation', label: 'ΥΠΟΧΡΕΩΣΗ ΤΟ ΚΕΝΤΡIΚΟ ΧΑΡΤΙ' };
    default:
      return { name: '', label: '' };
  }
}
export function creataPaymentTags(title, email) {
  let amount, customerTrns, merchantTrns;
  const tags = [];

  switch (title) {
    case subscriptionOption.yearly.split('_')[0]:
      amount = 5000;
      customerTrns = paymentDescription.yearly;
      merchantTrns = paymentDescription.yearly + ` του χρήστη ${email}`;
      tags.push(paymentDescription.yearly);
      break;
    case subscriptionOption.monthly.split('_')[0]:
      amount = 500;
      customerTrns = paymentDescription.monthly;
      merchantTrns = paymentDescription.monthly + ` του χρήστη ${email}`;
      tags.push(paymentDescription.monthly);
      break;
    default:
      break;
  }
  return { amount, tags, customerTrns, merchantTrns };
}
