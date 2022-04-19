import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userListSlice from '../features/userlist/userListSlice';

const rootReducer = combineReducers({
  userList: userListSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
