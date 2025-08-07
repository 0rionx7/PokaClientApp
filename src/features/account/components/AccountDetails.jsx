import {
  useGetUserQuery,
  useLogOutMutation,
} from 'features/account/api/accountApi';
import UserSubscription from 'features/account/components/UserSubscription';
import AccountRow from 'features/account/components/AccountIRow';
import EditPassword from 'features/account/components/EditPassword';
import { logOutSvg } from 'assets/svgs/various';
import LastGame from 'features/account/components/LastGame';
import UserName from 'features/account/components/UserName';
import Config from 'features/account/components/Config';
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
        <AccountRow
          element={<UserName />}
          title="ΟΝΟΜΑ ΧΡΗΣΤΗ"
          style={{ height: '3rem' }}
        />
        <AccountRow element={<EditPassword />} title="ΚΩΔΙΚΟΣ ΕΙΣΟΔΟΥ" />
        <AccountRow
          element={<UserSubscription />}
          title="ΔΙΑΧΕΙΡΗΣΗ ΣΥΝΔΡΟΜΗΣ"
          style={{ height: '5rem' }}
        />
        <AccountRow
          element={<LastGame savedGame={data?.lastGame} />}
          title="ΕΠΑΝΕΚΚΙΝΗΣΗ τελ. ΠΑΙΧΝΙΔΙΟΥ"
        />
        <AccountRow element={<Config />} title="ΡΥΘΜΙΣΕΙΣ" />
        <AccountRow
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
