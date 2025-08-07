import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import { moveCard } from 'features/chinese/slice/chineseStateSlice';

const Cell = ({ index, place, owner }) => {
  const dispatch = useDispatch();
  const [{ isOver, item }, drop] = useDrop(
    () => ({
      accept: 'card',
      canDrop: item => item.owner === owner,
      drop: ({ card }) => dispatch(moveCard({ place, index, card })),
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        item: monitor.getItem(),
      }),
    }),
    [index, place, owner]
  );

  return (
    <div
      ref={drop}
      className="card"
      style={{
        backgroundColor: !isOver
          ? '#5e7043'
          : item.owner === owner
          ? '#b5a239'
          : 'red',
      }}
    />
  );
};

export default memo(Cell);
