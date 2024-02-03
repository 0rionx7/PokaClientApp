import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory({ basename: '' });
var reactPlugin = new ReactPlugin();
// *** Add the Click Analytics plug-in. ***
/* var clickPluginInstance = new ClickAnalyticsPlugin();
   var clickPluginConfig = {
     autoCapture: true
}; */
export const appInsights = new ApplicationInsights({
  config: {
    connectionString: process.env.REACT_APP_APPINSIGHTS_KEY,
    // *** If you're adding the Click Analytics plug-in, delete the next line. ***
    extensions: [reactPlugin],
    // *** Add the Click Analytics plug-in. ***
    // extensions: [reactPlugin, clickPluginInstance],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
      // *** Add the Click Analytics plug-in. ***
      // [clickPluginInstance.identifier]: clickPluginConfig
    },
  },
});

appInsights.loadAppInsights();
appInsights.trackPageView();
