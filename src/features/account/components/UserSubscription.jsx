import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetUserQuery } from '@account/api/accountApi'
import { cn } from '@utils/helper-functions'
import Button from '@ui/Button'

import classes from './UserName.module.scss'

const UserSubscription = () => {
  const navigate = useNavigate()
  const {
    data: { subExpiration }
  } = useGetUserQuery(undefined)
  const [now] = useState(() => Date.now())

  const isExpired = !subExpiration || new Date(subExpiration) <= now

  const expiresAt = new Date(subExpiration).toLocaleDateString('el-GR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={cn(classes['flex-center'], classes['user-subscription'])}>
      {isExpired ? <div>Δέν έχετε ενεργή συνδρομή.</div> : <div>Λήξη: {expiresAt}</div>}
      <Button className="orange" prompt="Ανανέωση" onClick={() => navigate('subscription')} />
    </div>
  )
}

export default UserSubscription
