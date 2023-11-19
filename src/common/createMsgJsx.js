import { Fragment } from 'react';
import { describeTime } from 'src/common/text-functions';

export function createMessageJsx({ event, ...data }, index) {
  switch (event) {
    case 'neeext':
      const timeOut = data.reaction * (data.submitting ? 2 : 1);
      return (
        <Fragment key={index}>
          <span>@{data.playerName}</span> είναι σειρά σου να παίξεις.
          {timeOut < 100 && (
            <>
              Έχεις<span> {describeTime(timeOut)}</span>
            </>
          )}
          <br />
        </Fragment>
      );
    case 'newMessage':
      return (
        <Fragment key={index}>
          <span>--{data.playerName}: </span> {data.message} <br />
        </Fragment>
      );
    case 'playerSittingOut':
      return (
        <Fragment key={index}>
          <span>#</span> Ο παίκτης <span>{data.playerName}</span> αποχώρησε.
          <br />
        </Fragment>
      );
    case 'playerJoined':
      return (
        <Fragment key={index}>
          <span>#</span> Ο παίκτης <span>{data.playerName}</span> έκατσε στο
          τραπέζι.
          <br />
        </Fragment>
      );
    case 'playerRenewed':
      return (
        <Fragment key={index}>
          <span>#</span> Ο παίκτης <span>{data.playerName}</span> ανανέωσε με{' '}
          <span>{data.amount}</span> μονάδες.
          <br />
        </Fragment>
      );
    case 'playerRequested':
      return (
        <Fragment key={index}>
          Ο παίκτης <span>{data.playerName}</span> ζήτησε θέση στο τραπέζι.
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
          <span>#</span> Ο παίκτης <span>{data.playerName}</span> αρνήθηκε ένα
          χαρτί.
          <br />
        </Fragment>
      );
    case 'playerSwapped':
      return (
        <Fragment key={index}>
          <span>#</span> Ο παίκτης <span>{data.playerName}</span>
          {data.count === 0 ? (
            <>
              {' '}
              δεν άλλαξε κάποιο χαρτί
              <br />
            </>
          ) : (
            <>
              {' '}
              άλλαξε <span>{data.count} </span>
              χαρτ{data.count > 1 ? 'ά' : 'ί'}.
              <br />
            </>
          )}
        </Fragment>
      );
    default:
      return null;
  }
}
