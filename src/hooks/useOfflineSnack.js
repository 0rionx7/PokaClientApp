import { useEffect } from 'react'

import useOnlineStatus from '@hooks/useOnlineStatus'
import useSnackBar from '@hooks/useSnackBar'

const useOfflineSnack = () => {
  const isOnline = useOnlineStatus()
  const { snackElement, setSnackInfo } = useSnackBar({
    height: '100%',
    secs: 0
  })

  useEffect(() => {
    const msg = !isOnline ? 'Απώλεια σύνδεσης...\nΠροσπάθεια επανασύνδεσης σε εξέλιξη...' : ''
    setSnackInfo(msg)
  }, [isOnline, setSnackInfo])

  return snackElement
}

export default useOfflineSnack
