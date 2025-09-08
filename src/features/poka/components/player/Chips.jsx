import Chip from '@poka/components/player/Chip';

const Chips = ({ chipInfo }) => {
  if (typeof chipInfo[1] === 'object')
    return (
      <div className="green">
        {Object.entries(chipInfo[1]).map(([color, count], i) => (
          <Chip key={i} color={color} count={count} />
        ))}
      </div>
    );

  const [color, count] = chipInfo;

  return (
    <div className={color}>
      <Chip count={count} color={color} />
    </div>
  );
};

export default Chips;
