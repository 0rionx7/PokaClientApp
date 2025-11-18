import { useEffect } from 'react'

import { useGetUserQuery, useReconnectedLoginMutation } from '@account/api/accountApi'
import { socket } from '@store/gameApi'

export default function useRelogin(key) {
  const [reconnectLogin] = useReconnectedLoginMutation()
  const { refetch } = useGetUserQuery()

  useEffect(() => {
    if (!key.token && !key.orderCode) return

    socket.on('connect', async () => {
      await reconnectLogin(key)
      refetch()
    })

    return () => {
      socket.removeAllListeners('connect')
    }
  }, [key, reconnectLogin, refetch])
}
