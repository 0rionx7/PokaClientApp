import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { getPossitionClass } from 'lib/createPlayerClass';
import { createChipStyle } from 'lib/createChipStyle';
import { playerEntry } from 'common/utilities-functions';

const usePlayerClass = index => {
  const hostPlayerName = useSelector(state => state.account.username);
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const { playerName, submittedHand, handCards } =
    data?.playersStateList.at(index);
  const playersCount = data?.playersStateList.length;
  const hostIndex = data?.playersStateList.findIndex(
    playerEntry(hostPlayerName)
  );
  const playingList = data?.playersStateList.filter(ps =>
    data?.currentPlayerList.some(playerEntry(ps.playerName))
  );
  const playerSubmitted = submittedHand.length;
  const playingIndex = playingList.findIndex(playerEntry(playerName));
  const seat = index - hostIndex + 1 + (index < hostIndex ? playersCount : 0);
  const position = getPossitionClass(playersCount, seat - 1);
  const gridArea = 'player-' + seat;
  const className =
    'player p-' + seat + (playerSubmitted ? ' submitted' : '') + position;

  const chipsPosition = createChipStyle(handCards.length, position);

  return { className, gridArea, chipsPosition, playingIndex };
};

export default usePlayerClass;
