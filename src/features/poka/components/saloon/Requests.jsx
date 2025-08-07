import { useGetUserQuery } from 'features/account/api/accountApi';
import Request from 'features/poka/components/saloon/Request';
import './Requests.scss';

const Requests = () => {
  const { data } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const joinRequests = data?.joinRequests;

  return (
    <>
      <div className="requests-title">Απεσταλμένες αιτήσεις</div>
      <div className="requests">
        {joinRequests?.map((tableInfo, i) => (
          <Request key={i} tableInfo={tableInfo} />
        ))}
      </div>
    </>
  );
};

export default Requests;
