import { useGetUserQuery } from '@account/api/accountApi';
import { creataPaymentTags } from '@utils/text-functions';
import Button from '@ui/Button';
import './Subscription.scss';

const SubscriptionItem = ({ option, onSelect }) => {
  const { data } = useGetUserQuery();

  const { username, email } = data;
  const infos = option?.split('_');
  const title = infos.at(0);
  const customer = {
    fullName: username,
    email,
    countryCode: 'GR',
    requestLang: 'el-GR',
  };

  const handleSubscriptionSelect = () =>
    onSelect({ customer, ...creataPaymentTags(title, email) });

  return (
    <div className="subscription-item" onClick={handleSubscriptionSelect}>
      <div className="title">{title} </div>
      <p>{infos.at(1)}</p>
      <Button prompt="ΕΠΙΛΟΓΗ" className="orange" />
      <div className="amount">
        <span>€</span>
        {infos.at(2) / 100}
      </div>
    </div>
  );
};

export default SubscriptionItem;
