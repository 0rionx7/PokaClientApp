import { useLocation } from 'react-router-dom'

import { useGetUserQuery } from '@account/api/accountApi'
import UserRequest from '@components/requests/UserRequest'
import { useSitDownMutation } from '@poka/api/pokaApi'
import { useSitDownChineseMutation } from '@chinese/api/chineseApi'
import './Requests.scss'

const UserRequests = () => {
  const { data } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const { state } = useLocation()

  const joinRequests = data?.joinRequests.filter((req) => req.game === state.game)
  const useSitDown = state.game === 'poka' ? useSitDownMutation : useSitDownChineseMutation

  return (
    <>
      <div className="requests-title">Απεσταλμένες αιτήσεις</div>
      <div className="requests">
        {joinRequests?.map((tableInfo) => (
          <UserRequest key={tableInfo.tableName} tableInfo={tableInfo} useSitDown={useSitDown} />
        ))}
      </div>
    </>
  )
}

export default UserRequests
