import { Outlet } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useRequestResult from '@hooks/useRequestResult';
import useOfflineSnack from '@hooks/useOfflineSnack';

function App() {
  const [approvedElement, rejectedElement] = useRequestResult();
  const offLineElement = useOfflineSnack();

  return (
    <DndProvider backend={HTML5Backend}>
      {offLineElement}
      {approvedElement}
      {rejectedElement}
      <Outlet />
    </DndProvider>
  );
}

export default App;
