import { useEffect } from 'react';

import { usePayMutation } from 'features/paymentsMutations/usePayMutation';
import SubscriptionItem from 'pages/account/subscription/SubscriptionItem';
import { useGetUserQuery } from 'features/account/accountApi';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import Overlay from 'components/ui/Overlay';
import Frame from 'components/ui/Frame';
import { subscriptionOptions } from 'common/text-constants';
import { paymentsIcons } from 'assets/svgs/payments';

const SubscriptionOptions = () => {
  const [commitPayment, { data, isLoading, isSuccess }] = usePayMutation();
  useGetUserQuery();
  const { data: userData } = useGetUserQuery(undefined);

  useEffect(() => {
    if (data?.orderCode)
      window.location.href = `https://demo.vivapayments.com/web/checkout?ref=${data.orderCode}&color=224f1c`;
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
      <div className="sub-status">
        Κατάσταση συνδρομής:
        {noSubscription ? (
          ' Δέν έχετε ενεργή συνδρομή'
        ) : (
          <span> ενεργή έως {expiresAt}</span>
        )}
      </div>
      <span>ΕΠΙΛΟΓΕΣ ΑΝΑΝΕΩΣΗΣ</span>
      <Frame>
        <div className="subscription-options">
          {Object.values(subscriptionOptions).map(option => (
            <SubscriptionItem
              commitPayment={commitPayment}
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
