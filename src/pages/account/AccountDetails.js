import { useGetUserQuery } from 'features/account/accountApi';
import UserSubscription from 'pages/account/UserSubscription';
import AccountItem from 'pages/account/AccountItem';
import EditPassword from 'pages/account/EditPassword';
import LastGame from 'pages/account/LastGame';
import UserName from 'pages/account/UserName';
import Frame from 'components/ui/Frame';
import classes from './Account.module.scss';
import Config from 'pages/account/Config';

const AccountDetails = () => {
  const { data } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className={classes.account}>
      <Frame>
        <AccountItem
          element={<UserName />}
          title="ΟΝΟΜΑ ΧΡΗΣΤΗ"
          style={{ height: '3rem' }}
        />
        <AccountItem element={<EditPassword />} title="ΚΩΔΙΚΟΣ ΕΙΣΟΔΟΥ" />
        <AccountItem
          element={<UserSubscription />}
          title="ΔΙΑΧΕΙΡΗΣΗ ΣΥΝΔΡΟΜΗΣ"
          style={{ height: '5rem' }}
        />
        {data?.lastGame && (
          <AccountItem
            element={<LastGame savedGame={data?.lastGame} />}
            title="ΕΠΑΝΕΚΚΙΝΗΣΗ τελ. ΠΑΙΧΝΙΔΙΟΥ"
          />
        )}
        <AccountItem element={<Config />} title="ΡΥΘΜΙΣΕΙΣ" />
      </Frame>
    </div>
  );
};

export default AccountDetails;
