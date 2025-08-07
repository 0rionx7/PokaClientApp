import { useEffect } from 'react';

import SubscriptionItem from 'account/components/subscription/SubscriptionItem';
import { useGetUserQuery, usePayMutation } from 'account/api/accountApi';
import LoadingSpinner from 'ui/LoadingSpinner';
import Overlay from 'ui/Overlay';
import Frame from 'ui/Frame';
import { subscriptionOption } from 'utils/text-constants';
import { paymentsIcons } from 'assets/svgs/payments';

const SubscriptionOptions = () => {
  const [commitPayment, { data, isLoading, isSuccess }] = usePayMutation();
  useGetUserQuery();
  const { data: userData } = useGetUserQuery();

  useEffect(() => {
    if (data?.orderCode)
      window.location.href = `https://demo.vivapayments.com/web/checkout?ref=${data.orderCode}&color=#00b0b7`;
  }, [data?.orderCode]);

  if (isLoading || isSuccess)
    return (
      <div className="subscription">
        <Overlay className="subscription-overlay">
          Ανακατεύθυνση, σε ασφαλές για την πληρωμή περιβάλλον, σε εξέλιξη...
          <LoadingSpinner color="red" />
        </Overlay>
      </div>
    );

  const noSubscription =
    !userData?.subExpiration || new Date(userData?.subExpiration) <= Date.now();
  const expiresAt = new Date(userData?.subExpiration).toLocaleDateString(
    'el-GR',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="subscription">
      <div className="sub-status">Κατάσταση συνδρομής: </div>
      {noSubscription ? (
        ' Δέν έχετε ενεργή συνδρομή'
      ) : (
        <span> ενεργή έως {expiresAt}</span>
      )}

      <span>ΕΠΙΛΟΓΕΣ ΑΝΑΝΕΩΣΗΣ</span>
      <Frame>
        <div className="subscription-options">
          {Object.values(subscriptionOption).map(option => (
            <SubscriptionItem
              onClick={commitPayment}
              key={option}
              option={option}
            />
          ))}
        </div>
        <div className="payments-icons">{paymentsIcons}</div>
      </Frame>
    </div>
  );
};

export default SubscriptionOptions;
