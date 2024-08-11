import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";

import { Store } from "@reduxjs/toolkit";
import rootSaga from "./sagas";
import rootReducer from "./features";
// import rootReducer from "./features";

const makeStore = (): Store => {
  const sagaMiddleware = createSagaMiddleware({
    onError(error, errorInfo) {
      console.error(
        "An unhandled error occurred in the saga middleware",
        error,
        errorInfo
      );
    },
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(sagaMiddleware),
    devTools: import.meta.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = makeStore();

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
