import { Fragment } from 'react';
import { describeTime } from '@utils/text-functions';

export function createMessageJsx({ event, ...data }, index) {
  const { playerName, username, reaction, message, amount, dealer, count } =
    data;
  const playerCall = (
    <>
      Ο παίκτης <span>{playerName || username}</span>
    </>
  );

  switch (event) {
    case 'neeext': {
      return (
        <Fragment key={index}>
          <span>@{playerName}</span> είναι σειρά σου να παίξεις.
          {reaction && (
            <>
              Έχεις<span> {describeTime(reaction)}</span>
            </>
          )}
          <br />
        </Fragment>
      );
    }
    case 'newMessage':
      return (
        <Fragment key={index}>
          <span>--{playerName}: </span> {message}
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
          <span>#</span> {playerCall} ανανέωσε με <span>{amount}</span> μονάδες.
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
          <span>#</span> <span>{dealer}</span> είναι σειρά σου να μοιράσεις.
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
          {count === 0 ? (
            <> δεν άλλαξε κάποιο χαρτί</>
          ) : (
            <>
              {' '}
              άλλαξε <span>{count} </span>
              χαρτ{count > 1 ? 'ά' : 'ί'}.
            </>
          )}
          <br />
        </Fragment>
      );
    default:
      return null;
  }
}
