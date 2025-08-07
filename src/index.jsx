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

import './index.scss';
import reportWebVitals from './reportWebVitals';
import SubscriptionOptions from './features/account/components/subscription/SubscriptionOptions';
import SuccessfulPayment from './features/account/components/subscription/SuccessfulPayment';
import FailedPayment from './features/account/components/subscription/FailedPayment';
import AccountDetails from './features/account/components/AccountDetails';
import ResetPassword from './features/account/components/ResetPassword';
import Instructions from './pages/Instructions';
import Account from './features/account/components/Account';
import Saloon from './features/poka/Saloon';
import Register from './features/account/components/Register';
import Welcome from './pages/Welcome';
import Forgot from './features/account/components/Forgot';
import Login from './features/account/components/Login';
import Room from './features/poka/Room';
import Layout from './components/layout/Layout';
import RouteGuard from './utils/route-guard';
import { store } from './store/store';
import App from './App';
import ChineseRoom from './features/chinese/components/ChineseRoom';
import ChineseSaloon from './features/chinese/components/saloon/ChineseSaloon';

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
