import Button from 'src/components/ui/Button';
import './Subscription.scss';

const SubscriptionItem = ({ option, commitPayment }) => {
  const infos = option?.split('_');
  const title = infos.at(0);

  return (
    <div className="subscription-item" onClick={() => commitPayment(title)}>
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
