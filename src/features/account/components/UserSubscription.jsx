import { useNavigate } from 'react-router-dom'

import { useGetUserQuery } from '@account/api/accountApi'
import Button from '@ui/Button'
import classes from './UserName.module.scss'

const UserSubscription = () => {
  const navigate = useNavigate()
  const {
    data: { subExpiration }
  } = useGetUserQuery(undefined)

  const isExpired = !subExpiration || new Date(subExpiration) <= Date.now()

  const expiresAt = new Date(subExpiration).toLocaleDateString('el-GR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={classes['flex-center'] + ' ' + classes['user-subscription']}>
      {isExpired ? <div>Δέν έχετε ενεργή συνδρομή.</div> : <div>Λήξη: {expiresAt}</div>}
      <Button className="orange" prompt="Ανανέωση" onClick={() => navigate('subscription')} />
    </div>
  )
}

export default UserSubscription
