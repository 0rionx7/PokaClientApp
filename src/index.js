import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from 'reportWebVitals';
import './index.scss';

import FailedPayment from 'pages/subscription/FailedPayment';
import { store } from 'store/store';
import Layout from 'components/layout/Layout';
import Account from 'pages/account/Account';
import SubscriptionOptions from 'pages/subscription/SubscriptionOptions';
import SuccessfulPayment from 'pages/subscription/SuccessfulPayment';
import AccountDetails from 'pages/account/AccountDetails';
import Saloon from 'pages/saloon/Saloon';
import Welcome from 'pages/Welcome';
import Register from 'pages/Register';
import Login from 'pages/Login';
import RouteGuard from 'lib/route-guard';
import Room from 'pages/Room';
import App from 'App';

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
