import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameStateSlice/gameApi';
import { orderName } from 'common/text-constants';

const FaceDownCards = () => {
  const { gameId } = useParams();
  const { faceDownIndexes, cardsInHand } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      faceDownIndexes: data.faceDownIndexes?.slice().sort(),
      cardsInHand: data.cardsInHand,
    }),
  });
  if (faceDownIndexes.length === 7) return null;

  let closed = [];
  faceDownIndexes.forEach((index, i, { length }) => {
    if (index + 1 <= cardsInHand)
      closed.push(
        <Fragment key={orderName[index]}>
          {i === 0 ? '' : ', '}
          <span>{orderName[index]}</span>
          {i + 1 === length ? <> κλειστό</> : <></>}
        </Fragment>
      );
  });
  return <div>{closed}</div>;
};

export default FaceDownCards;
