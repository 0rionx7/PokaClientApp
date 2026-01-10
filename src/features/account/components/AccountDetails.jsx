import { useGetUserQuery, useLogOutMutation } from '@account/api/accountApi'
import UserSubscription from '@account/components/UserSubscription'
import AccountRow from '@account/components/AccountIRow'
import EditPassword from '@account/components/EditPassword'
import { logOutSvg } from '@icons/various'
import LastGame from '@account/components/LastGame'
import UserName from '@account/components/UserName'
import Config from '@account/components/Config'
import { cn } from '@utils/helper-functions'
import Button from '@ui/Button'
import Frame from '@ui/Frame'

import classes from './Account.module.scss'

const AccountDetails = () => {
  const [logOut] = useLogOutMutation()
  const { data } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true
  })

  return (
    <div className={classes.account}>
      <Frame>
        <AccountRow element={<UserName />} title="ΟΝΟΜΑ ΧΡΗΣΤΗ" style={{ height: '3rem' }} />
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
              className={cn(classes.logout, 'red')}
              prompt={<>{logOutSvg}Αποσύνδεση</>}
              onClick={() => logOut()}
            />
          }
        />
      </Frame>
    </div>
  )
}

export default AccountDetails
