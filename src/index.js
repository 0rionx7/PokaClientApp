import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from 'src/reportWebVitals';
import './index.scss';

import FailedPayment from 'src/pages/subscription/FailedPayment';
import { store } from 'src/store/store';
import Layout from 'src/components/layout/Layout';
import Account from 'src/pages/account/Account';
import SubscriptionOptions from 'src/pages/subscription/SubscriptionOptions';
import SuccessfulPayment from 'src/pages/subscription/SuccessfulPayment';
import Saloon from 'src/pages/saloon/Saloon';
import Welcome from 'src/pages/Welcome';
import Register from 'src/pages/Register';
import Login from 'src/pages/Login';
import RouteGuard from 'src/lib/route-guard';
import Room from 'src/pages/Room';
import App from 'src/App';
import AccountDetails from 'src/pages/account/AccountDetails';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route errorElement={<div>Error - Router error element</div>}>
        <Route element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<RouteGuard element={<Account />} />}>
            <Route index element={<AccountDetails />} />
            <Route path="subscription" element={<SubscriptionOptions />} />
          </Route>
          <Route path="successfulPayment" element={<SuccessfulPayment />} />
          <Route path="failedPayment" element={<FailedPayment />} />
          <Route path="saloon" element={<RouteGuard element={<Saloon />} />} />
          <Route path="*" element={<h1>420 Not Found</h1>} />
        </Route>
        <Route
          path="table/:gameId"
          element={<RouteGuard element={<Room />} />}
        />
      </Route>
    </Route>
  )
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
