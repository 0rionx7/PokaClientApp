import { useState, useEffect } from 'react'

import SubscriptionItem from '@account/components/subscription/SubscriptionItem'
import { useGetUserQuery, usePayMutation } from '@account/api/accountApi'
import LoadingSpinner from '@ui/LoadingSpinner'
import Overlay from '@ui/Overlay'
import Frame from '@ui/Frame'
import { SUBSCRIPTION_TYPES } from '@utils/text-constants'
import { payments } from '@icons/payments'

const SubscriptionOptions = () => {
  const [pay, { data, isLoading, isSuccess }] = usePayMutation()
  useGetUserQuery()
  const {
    data: { subExpiration }
  } = useGetUserQuery()
  const [now] = useState(() => Date.now())

  useEffect(() => {
    if (data?.orderCode)
      window.location.href = `https://demo.vivapayments.com/web/checkout?ref=${data.orderCode}&color=#00b0b7`
  }, [data?.orderCode])

  if (isLoading || isSuccess)
    return (
      <div className="subscription">
        <Overlay className="subscription-overlay">
          <section>
            Ανακατεύθυνση, σε ασφαλές για την πληρωμή περιβάλλον, σε εξέλιξη...
            <LoadingSpinner color="red" />
          </section>
        </Overlay>
      </div>
    )

  const noSubscription = !subExpiration || new Date(subExpiration) <= now
  const expiresAt = new Date(subExpiration).toLocaleDateString('el-GR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="subscription">
      <div className="sub-status">Κατάσταση συνδρομής: </div>
      {noSubscription ? ' Δέν έχετε ενεργή συνδρομή' : <span> ενεργή έως {expiresAt}</span>}

      <span>ΕΠΙΛΟΓΕΣ ΑΝΑΝΕΩΣΗΣ</span>
      <Frame>
        <div className="subscription-options">
          {Object.entries(SUBSCRIPTION_TYPES).map(([title, infos]) => (
            <SubscriptionItem key={title} title={title} infos={infos} onSelect={pay} />
          ))}
        </div>
        <div className="payments-icons">
          <img src={payments.card} alt={'card'} />
          <img src={payments.dias} alt={'dias'} />
          <img src={payments.vivaWallet} alt={'vivawallet'} />
        </div>
      </Frame>
    </div>
  )
}

export default SubscriptionOptions
