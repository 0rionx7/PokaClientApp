import { describeTime } from '@utils/text-functions'

const Message = ({ data }) => {
  const { event, playerName, username, reaction, message, amount, dealer, count } = data

  const playerCall = (
    <>
      Ο παίκτης <span>{playerName || username}</span>
    </>
  )
  const messageMap = {
    neeext: (
      <>
        <span>@{playerName}</span> είναι σειρά σου να παίξεις.
        {reaction && (
          <>
            Έχεις<span> {describeTime(reaction)}</span>
          </>
        )}
      </>
    ),
    newMessage: (
      <>
        <span>--{playerName}: </span> {message}
      </>
    ),
    playerSittingOut: (
      <>
        <span>#</span> {playerCall} αποχώρησε.
      </>
    ),
    playerJoined: (
      <>
        <span>#</span> {playerCall} έκατσε στο τραπέζι.
      </>
    ),
    playerRenewed: (
      <>
        <span>#</span> {playerCall} ανανέωσε με <span>{amount}</span> μονάδες.
      </>
    ),
    requestAdded: <> {playerCall} ζήτησε θέση στο τραπέζι.</>,
    playerDeals: (
      <>
        <span>#</span> <span>{dealer}</span> είναι σειρά σου να μοιράσεις.
      </>
    ),
    playerDenied: (
      <>
        <span>#</span> {playerCall} αρνήθηκε ένα χαρτί.
      </>
    ),
    playerSwapped: (
      <>
        <span>#</span> {playerCall}
        {count === 0 ? (
          <> δεν άλλαξε κάποιο χαρτί</>
        ) : (
          <>
            άλλαξε <span>{count} </span>
            χαρτ{count > 1 ? 'ά' : 'ί'}.
          </>
        )}
      </>
    )
  }

  return (
    <>
      {messageMap[event]}
      <br />
    </>
  )
}

export default Message
