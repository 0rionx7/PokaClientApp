import { useGetUserQuery } from 'features/authSlice/authApi';
import UserSubscription from 'pages/account/UserSubscription';
import AccountItem from 'pages/account/AccountItem';
import EditPassword from 'pages/account/EditPassword';
import LastGame from 'pages/account/LastGame';
import UserName from 'pages/account/UserName';
import Frame from 'components/ui/Frame';
import classes from './Account.module.scss';

const AccountDetails = () => {
  const { lastGame } = useGetUserQuery(undefined, {
    selectFromResult: ({ data }) => ({ lastGame: data?.user.lastGame }),
    refetchOnMountOrArgChange: true, // for updating account LastGAme
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
        {lastGame && (
          <AccountItem
            element={<LastGame savedGame={lastGame} />}
            title="ΕΠΑΝΕΚΚΙΝΗΣΗ τελ. ΠΑΙΧΝΙΔΙΟΥ"
          />
        )}
      </Frame>
    </div>
  );
};

export default AccountDetails;
