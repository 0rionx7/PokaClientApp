import { useSelector } from 'react-redux';

import Request from 'src/pages/saloon/Request';
import './Requests.scss';

const Requests = () => {
  const joinRequests = useSelector(state => state.gameState.joinRequests);

  if (!joinRequests.length) return null;

  return (
    <>
      <div className="requests-title">Ενεργές αιτήσεις</div>
      <div className="requests">
        {joinRequests.map((tableIfo, i) => (
          <Request key={i} tableIfo={tableIfo} />
        ))}
      </div>
    </>
  );
};

export default Requests;
