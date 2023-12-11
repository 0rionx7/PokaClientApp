import { useSelector } from 'react-redux';

import Request from 'pages/saloon/Request';
import './Requests.scss';

const Requests = () => {
  const joinRequests = useSelector(state => state.account.joinRequests);

  if (!joinRequests.length) return null;

  return (
    <>
      <div className="requests-title">Ενεργές αιτήσεις</div>
      <div className="requests">
        {joinRequests.map((tableInfo, i) => (
          <Request key={i} tableInfo={tableInfo} />
        ))}
      </div>
    </>
  );
};

export default Requests;
