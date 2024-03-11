import './analytics';
import { createRoot } from 'react-dom/client';
import reportWebVitals from 'reportWebVitals';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.scss';

import SubscriptionOptions from 'pages/account/subscription/SubscriptionOptions';
import SuccessfulPayment from 'pages/account/subscription/SuccessfulPayment';
import FailedPayment from 'pages/account/subscription/FailedPayment';
import AccountDetails from 'pages/account/AccountDetails';
import ResetPassword from 'pages/ResetPassword';
import Instructions from 'pages/Instructions';
import Account from 'pages/account/Account';
import Saloon from 'pages/saloon/Saloon';
import Register from 'pages/Register';
import Welcome from 'pages/Welcome';
import Forgot from 'pages/Forgot';
import Login from 'pages/Login';
import Room from 'pages/Room';
import Layout from 'components/layout/Layout';
import RouteGuard from 'utils/route-guard';
import { store } from 'store/store';
import App from 'App';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route errorElement={<div>Error - Router error element</div>}>
        <Route element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="instructions" element={<Instructions />} />
          <Route path="saloon" element={<RouteGuard element={<Saloon />} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="account" element={<RouteGuard element={<Account />} />}>
            <Route index element={<AccountDetails />} />
            <Route path="subscription" element={<SubscriptionOptions />} />
          </Route>
          <Route path="successfulPayment" element={<SuccessfulPayment />} />
          <Route path="failedPayment" element={<FailedPayment />} />
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
