import { combineReducers } from '@reduxjs/toolkit';

import { reducer as filesReducer } from './files/fileSlice';

export const rootReducer = combineReducers({
    filesReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;