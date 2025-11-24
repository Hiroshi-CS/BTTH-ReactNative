import { authReducer } from "./reducers/authReducer";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineSlices(authReducer);

const rootStoreReduxToolkit = configureStore({
    reducer: rootReducer
});

export { rootStoreReduxToolkit };

export type RootState = ReturnType<typeof rootReducer>
