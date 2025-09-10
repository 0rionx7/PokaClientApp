import { useGetUserQuery } from '@account/api/accountApi';
import { creataPaymentTags } from '@utils/text-functions';
import Button from '@ui/Button';
import './Subscription.scss';

const SubscriptionItem = ({ title, infos, onSelect }) => {
  const { data } = useGetUserQuery();

  const { username, email } = data;
  const { description, value } = infos;
  const customer = {
    fullName: username,
    email,
    countryCode: 'GR',
    requestLang: 'el-GR',
  };

  const handleSubscriptionSelect = () =>
    onSelect({ customer, ...creataPaymentTags(value, username) });

  return (
    <div className="subscription-item" onClick={handleSubscriptionSelect}>
      <div className="title">{title} </div>
      <p>{description}</p>
      <Button prompt="ΕΠΙΛΟΓΗ" className="orange" />
      <div className="amount">
        <span>€</span>
        {value / 100}
      </div>
    </div>
  );
};

export default SubscriptionItem;
