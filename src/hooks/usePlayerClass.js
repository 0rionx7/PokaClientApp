import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/poka/pokaApi';
import { selectUserName } from 'features/account/accountSlice';
import { getPossitionClass } from 'utils/createPlayerClass';
import { playerEntry } from 'utils/utilities-functions';
import { getChipsPosition } from 'utils/getChipsPosition';

const usePlayerClass = index => {
  const hostPlayerName = useSelector(selectUserName);
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const { playerName, submittedHand, handCards } = data?.playerStates.at(index);
  const playersCount = data?.playerStates.length;
  const hostIndex = data?.playerStates.findIndex(playerEntry(hostPlayerName));
  const playingList = data?.playerStates.filter(ps =>
    data?.currentPlayerList.some(playerEntry(ps.playerName))
  );
  const playerSubmitted = submittedHand.length;
  const playingIndex = playingList.findIndex(playerEntry(playerName));
  let seat;
  if (data.rotation === 'clockwise') {
    seat =
      hostIndex <= index
        ? index - hostIndex + 1
        : playersCount + 1 - (hostIndex - index);
  } else {
    seat =
      hostIndex < index
        ? playersCount + 1 - (index - hostIndex)
        : hostIndex - index + 1;
  }
  const position = getPossitionClass(playersCount, seat - 1);
  const gridArea = 'player-' + seat;
  const className =
    'player p-' + seat + (playerSubmitted ? ' submitted' : '') + position;

  const chipsPosition = getChipsPosition(
    submittedHand.length || handCards.length,
    position
  );

  return { className, gridArea, chipsPosition, playingIndex };
};

export default usePlayerClass;
