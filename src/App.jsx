import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { selectToken } from '@account/slice/accountSlice'
import useRequestResult from '@hooks/useRequestResult'
import useOfflineSnack from '@hooks/useOfflineSnack'
import useRelogin from '@hooks/useLoginOnConnect'

function App() {
  const token = useSelector(selectToken)
  const [approvedElement, rejectedElement] = useRequestResult()
  const offLineElement = useOfflineSnack()
  useRelogin({ token })

  return (
    <DndProvider backend={HTML5Backend}>
      {offLineElement}
      {approvedElement}
      {rejectedElement}
      <Outlet />
    </DndProvider>
  )
}

export default App
