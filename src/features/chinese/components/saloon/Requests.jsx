import { useGetUserQuery } from '@account/api/accountApi';
import Request from './Request';

const Requests = () => {
  const { data } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const joinRequests = data?.joinChineseRequests;

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
