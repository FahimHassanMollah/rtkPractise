import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../features/api/apiSlice";
import { rtkQueryErrorLogger } from "../features/api/rtkQueryErrorLogger";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(rtkQueryErrorLogger).concat(apiSlice.middleware),
});

// enable listener behavior for the store
setupListeners(store.dispatch);
