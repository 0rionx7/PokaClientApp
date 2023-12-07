import {
  ERROR_RESPONSE,
  UNAUTHORISED_REQUEST_ERROR,
  paymentsDescription,
  subscriptionOptions,
} from 'common/text-constants';
import { baseUrl, gameApi } from 'features/gameStateSlice/gameApi';

export const { usePayMutation } = gameApi.injectEndpoints({
  endpoints: build => ({
    pay: build.mutation({
      queryFn: async (title, { getState }, _extraOptions) => {
        const { token } = getState().auth;
        const headers = new Headers({ 'Content-type': 'application/json' });
        if (token) headers.set('authorization', `Bearer ${token}`);
        else return UNAUTHORISED_REQUEST_ERROR;

        const { username, email } =
          getState().gameApi.queries['getUser(undefined)'].data;

        const customer = {
          fullName: username,
          email,
          countryCode: 'GR',
          requestLang: 'el-GR',
        };
        let amount, customerTrns, merchantTrns;
        const tags = [];

        switch (title) {
          case subscriptionOptions.yearly.split('_')[0]:
            amount = 5000;
            customerTrns = paymentsDescription.yearly;
            merchantTrns = paymentsDescription.yearly + ` του χρήστη ${email}`;
            tags.push(paymentsDescription.yearly);
            break;
          case subscriptionOptions.monthly.split('_')[0]:
            amount = 500;
            customerTrns = paymentsDescription.monthly;
            merchantTrns = paymentsDescription.monthly + ` του χρήστη ${email}`;
            tags.push(paymentsDescription.monthly);
            break;
          // case subscriptionOptions.orderGame:
          //   amount = 500;
          //   customerTrns = paymentsDescription.orderGame;
          //   merchantTrns =
          //     paymentsDescription.orderGame + ` του χρήστη ${email}`;
          //   tags.push(paymentsDescription.orderGame);
          //   break;
          default:
            break;
        }

        let response;
        try {
          response = await fetch(baseUrl + '/payments', {
            method: 'POST',
            body: JSON.stringify({
              amount,
              customer,
              customerTrns,
              merchantTrns,
              tags,
            }),
            headers,
          });
        } catch (error) {
          console.dir(error);
        }

        const responseData = await response.json();
        if (!response.ok) return ERROR_RESPONSE(responseData);

        return { data: responseData };
      },
    }),
  }),
});
