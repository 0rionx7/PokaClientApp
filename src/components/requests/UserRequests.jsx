import { useGetUserQuery } from '@account/api/accountApi';
import UserRequest from '@components/requests/UserRequest';
import { useSitDownMutation } from '@poka/api/pokaApi';
import { useSitDownChineseMutation } from '@chinese/api/chineseApi';
import './Requests.scss';

const UserRequests = ({ game }) => {
  const { data } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const joinRequests = data?.joinRequests.filter(req => req.game === game);
  const useSitDown =
    game === 'poka' ? useSitDownMutation : useSitDownChineseMutation;

  return (
    <>
      <div className="requests-title">Απεσταλμένες αιτήσεις</div>
      <div className="requests">
        {joinRequests?.map(tableInfo => (
          <UserRequest
            key={tableInfo.tableName}
            tableInfo={tableInfo}
            useSitDown={useSitDown}
          />
        ))}
      </div>
    </>
  );
};

export default UserRequests;
