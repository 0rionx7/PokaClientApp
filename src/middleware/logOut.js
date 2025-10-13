import { gameApi } from '@store/gameApi';

export const logoutMiddleware = (store) => (next) => (action) => {
  if (
    action.type === 'gameApi/executeMutation/fulfilled' &&
    action.meta?.arg?.endpointName === 'logOut'
  ) {
    store.dispatch(gameApi.util.resetApiState());
  }

  return next(action);
};
