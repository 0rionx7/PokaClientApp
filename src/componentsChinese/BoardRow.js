import { memo } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateChineseQuery } from 'features/gameStateChinese/gameStateApi';
import { isSeated } from 'utils/utilities-functions';
import './Board.scss';

import RenderItem from './RenderItem';
import './Board.scss';

const BoardRow = ({ rowIndex, playerState }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateChineseQuery(gameId);
  const boardCards = useSelector(state => state.chineseGameState.boardCards);
  const { username } = useSelector(state => state.account);

  const isHostBoard = playerState.playerName === username;
  const { currentPlayerList, playersStateList } = data;
  const showScore =
    currentPlayerList.length === playersStateList.filter(isSeated).length;

  let pastIndexes = 0;
  let cards = isHostBoard ? boardCards : playerState.boardCards;
  const hidden = playerState.isFantasy && !isHostBoard && !showScore;
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
