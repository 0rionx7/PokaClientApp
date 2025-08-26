import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import { moveCard } from '@chinese/slice/chineseStateSlice';

const Cell = ({ index, place, owner }) => {
  const dispatch = useDispatch();
  const [{ isOver, item }, drop] = useDrop(
    () => ({
      accept: 'card',
      canDrop: item => item.owner === owner,
      drop: ({ card }) => dispatch(moveCard({ place, index, movedCard: card })),
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        item: monitor.getItem(),
      }),
    }),
    [index, place, owner]
  );

  const style = {
    backgroundColor: !isOver
      ? '#5e7043'
      : item.owner === owner
      ? '#b5a239'
      : 'red',
  };

  return <div ref={drop} className="card" style={style} />;
};

export default memo(Cell);
