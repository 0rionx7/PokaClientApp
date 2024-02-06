import {
  useGetUserQuery,
  useLogOutMutation,
} from 'features/account/accountApi';
import UserSubscription from 'pages/account/UserSubscription';
import AccountItem from 'pages/account/AccountItem';
import EditPassword from 'pages/account/EditPassword';
import { logOutSvg } from 'assets/svgs/various';
import LastGame from 'pages/account/LastGame';
import UserName from 'pages/account/UserName';
import Config from 'pages/account/Config';
import Frame from 'components/ui/Frame';
import classes from './Account.module.scss';
import Button from 'components/ui/Button';

const AccountDetails = () => {
  const [logOut] = useLogOutMutation();
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
        <AccountItem
          element={
            <Button
              className={classes.logout + ' red'}
              prompt={<>{logOutSvg}Αποσύνδεση</>}
              onClick={() => logOut()}
            />
          }
        />
      </Frame>
    </div>
  );
};

export default AccountDetails;
