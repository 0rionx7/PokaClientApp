import { Fragment } from 'react';
import { describeTime } from '@utils/text-functions';

export function createMessageJsx({ event, ...data }, index) {
  const playerCall = (
    <>
      Ο παίκτης <span>{data.playerName || data.username}</span>
    </>
  );

  switch (event) {
    case 'neeext': {
      return (
        <Fragment key={index}>
          <span>@{data.playerName}</span> είναι σειρά σου να παίξεις.
          {data.reaction && (
            <>
              Έχεις<span> {describeTime(data.reaction)}</span>
            </>
          )}
          <br />
        </Fragment>
      );
    }
    case 'newMessage':
      return (
        <Fragment key={index}>
          <span>--{data.playerName}: </span> {data.message}
          <br />
        </Fragment>
      );
    case 'playerSittingOut':
      return (
        <Fragment key={index}>
          <span>#</span> {playerCall} αποχώρησε.
          <br />
        </Fragment>
      );
    case 'playerJoined':
      return (
        <Fragment key={index}>
          <span>#</span> {playerCall} έκατσε στο τραπέζι.
          <br />
        </Fragment>
      );
    case 'playerRenewed':
      return (
        <Fragment key={index}>
          <span>#</span> {playerCall} ανανέωσε με <span>{data.amount}</span>{' '}
          μονάδες.
          <br />
        </Fragment>
      );
    case 'requestAdded':
      return (
        <Fragment key={index}>
          {playerCall} ζήτησε θέση στο τραπέζι.
          <br />
        </Fragment>
      );
    case 'playerDeals':
      return (
        <Fragment key={index}>
          <span>#</span> <span>{data.dealer}</span> είναι σειρά σου να
          μοιράσεις.
          <br />
        </Fragment>
      );
    case 'playerDenied':
      return (
        <Fragment key={index}>
          <span>#</span> {playerCall} αρνήθηκε ένα χαρτί.
          <br />
        </Fragment>
      );
    case 'playerSwapped':
      return (
        <Fragment key={index}>
          <span>#</span> {playerCall}
          {data.count === 0 ? (
            <> δεν άλλαξε κάποιο χαρτί</>
          ) : (
            <>
              {' '}
              άλλαξε <span>{data.count} </span>
              χαρτ{data.count > 1 ? 'ά' : 'ί'}.
            </>
          )}
          <br />
        </Fragment>
      );
    default:
      return null;
  }
}
