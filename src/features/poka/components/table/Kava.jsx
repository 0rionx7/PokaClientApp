import { formatNumber } from '@utils/helper-functions';

const Kava = ({ kavaInfo }) => {
  const { amount, players } = kavaInfo;

  return (
    <div className="kava">
      {formatNumber(amount)} {players.join(', ')}
    </div>
  );
};

export default Kava;
