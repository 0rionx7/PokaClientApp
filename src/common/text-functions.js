import { cardsName, cardsNameOf, handKind } from 'common/text-constants';

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
    firstPart = ' ' + cardsNameOf[submissionInfo.desc[0]];
  else
    firstPart =
      (submissionInfo.desc[0] === 12 ? ' της ' : ' του ') +
      cardsName[submissionInfo.desc[0]];

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
        ? ` με ${cardsNameOf[submissionInfo.desc[1]]}`
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
