import { memo } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetChineseStateQuery } from 'features/chinese/chineseApi';
import { selectBoardCards } from 'features/chinese/chineseStateSlice';
import { selectUserName } from 'features/account/accountSlice';
import { isSitting } from 'utils/utilities-functions';
import './Board.scss';

import RenderItem from './RenderItem';
import './Board.scss';

const BoardRow = ({ rowIndex, playerState }) => {
  const { gameId } = useParams();
  const { data } = useGetChineseStateQuery(gameId);
  const boardCards = useSelector(selectBoardCards);
  const username = useSelector(selectUserName);

  const isHostBoard = playerState.playerName === username;
  const { currentPlayerList, playerStates } = data;
  const isRoundEnd =
    currentPlayerList.length <= playerStates.filter(isSitting).length;

  let pastIndexes = 0;
  let cards = isHostBoard ? boardCards : playerState.boardCards;
  const hidden = playerState.isFantasy && !isHostBoard && !isRoundEnd;
  cards = cards?.map(card => (card ? { ...card, hidden } : null));
  if (rowIndex === 0) cards = cards?.slice(0, 3);
  else if (rowIndex === 1) {
    cards = cards?.slice(3, 8);
    pastIndexes = 3;
  } else {
    cards = cards?.slice(8);
    pastIndexes = 8;
  }

  return (
    <>
      {cards?.map((card, index) => (
        <RenderItem
          key={index}
          card={card}
          index={index + pastIndexes}
          owner={playerState.playerName}
          place="boardCards"
        />
      ))}
    </>
  );
};

export default memo(BoardRow);
