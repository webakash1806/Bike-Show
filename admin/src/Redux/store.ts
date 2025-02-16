import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slice/AuthSlice'
import { bikeApi } from './API/BikeAPI'
import { scootyApi } from './API/ScootyApi'
import { accessoriesApi } from './API/AccessoriesApi'
import { helmetApi } from './API/HelmetApi'
import { formApi } from './API/FormApi'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        [bikeApi.reducerPath]: bikeApi.reducer,
        [scootyApi.reducerPath]: scootyApi.reducer,
        [accessoriesApi.reducerPath]: accessoriesApi.reducer,
        [helmetApi.reducerPath]: helmetApi.reducer,
        [formApi.reducerPath]: formApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            bikeApi.middleware,
            scootyApi.middleware,
            accessoriesApi.middleware,
            helmetApi.middleware,
            formApi.middleware
        )
});

export default store;