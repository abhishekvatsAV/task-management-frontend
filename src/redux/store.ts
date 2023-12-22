import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./slices/Auth";

export const store = configureStore({
  reducer: {
    auth: authReducers,
  },
});

// Below lines are only if using typescript
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
