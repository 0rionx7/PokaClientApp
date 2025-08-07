// import './analytics';
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import SubscriptionOptions from '@account/components/subscription/SubscriptionOptions';
import SuccessfulPayment from '@account/components/subscription/SuccessfulPayment';
import FailedPayment from '@account/components/subscription/FailedPayment';
import ChineseSaloon from '@chinese/components/saloon/ChineseSaloon';
import AccountDetails from '@account/components/AccountDetails';
import ResetPassword from '@account/components/ResetPassword';
import ChineseRoom from '@chinese/components/ChineseRoom';
import Instructions from './pages/Instructions';
import Account from '@account/components/Account';
import Saloon from '@poka/Saloon';
import Register from '@account/components/Register';
import Welcome from './pages/Welcome';
import Forgot from '@account/components/Forgot';
import Login from '@account/components/Login';
import Room from '@poka/Room';
import Layout from '@layout/Layout';
import RouteGuard from '@utils/route-guard';
import { store } from './store/store';
import App from './App';
import '@styles/index.scss';

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
          <Route
            path="saloon-chinese"
            element={<RouteGuard element={<ChineseSaloon />} />}
          />
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
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
        <Route
          path="table/:gameId"
          element={<RouteGuard element={<Room />} />}
        />
        <Route
          path="chinese/table/:gameId"
          element={<RouteGuard element={<ChineseRoom />} />}
        />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
root.render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </Provider>
  // </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
