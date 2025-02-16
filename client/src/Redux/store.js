import { configureStore } from "@reduxjs/toolkit";
import { bikeApi } from "./AllApi/BikeApi";
import { formApi } from "./AllApi/FormApi";

const store = configureStore({
    reducer: {
        [bikeApi.reducerPath]: bikeApi.reducer,
        [formApi.reducerPath]: formApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            bikeApi.middleware,
            formApi.middleware
        ),
});


export default store