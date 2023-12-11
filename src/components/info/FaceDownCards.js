import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { orderName } from 'common/text-constants';

const FaceDownCards = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  if (data.faceDownIndexes.length === 7) return null;

  let closed = [];
  data.faceDownIndexes
    ?.slice()
    .sort()
    .forEach((index, i, { length }) => {
      if (index + 1 <= data?.cardsInHand)
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
