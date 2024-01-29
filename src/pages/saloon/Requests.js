import { useSelector } from 'react-redux';

import Request from 'pages/saloon/Request';
import './Requests.scss';

const Requests = () => {
  const joinRequests = useSelector(state => state.account.joinRequests);

  return (
    <>
      <div className="requests-title">Απεσταλμένες αιτήσεις</div>
      <div className="requests">
        {joinRequests.map((tableInfo, i) => (
          <Request key={i} tableInfo={tableInfo} />
        ))}
      </div>
    </>
  );
};

export default Requests;
