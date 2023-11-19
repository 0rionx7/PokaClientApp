import { useGetUserQuery } from 'src/features/authSlice/authApi';
import UserSubscription from 'src/pages/account/UserSubscription';
import AccountItem from 'src/pages/account/AccountItem';
import EditPassword from 'src/pages/account/EditPassword';
import LastGame from 'src/pages/account/LastGame';
import UserName from 'src/pages/account/UserName';
import Frame from 'src/components/ui/Frame';
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
