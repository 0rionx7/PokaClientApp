import { useGetUserQuery } from 'features/account/accountApi';
import Request from './Request';

const Requests = () => {
  const { data } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const joinRequests = data?.joinRequestsChinese;

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
