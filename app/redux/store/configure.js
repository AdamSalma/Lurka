import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
  // This is for a chrome addon called redux devtools. Very useful.
  const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleware = [ thunkMiddleware ];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middleware.push(createLogger({
      collapsed: true,
      duration: true,
      diff: true
    }));
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
