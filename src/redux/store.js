import { configureStore } from "@reduxjs/toolkit";
// import expenseReducer from "./expenseSlice";
// import usersReducer from "./usersSlice";
// import postsReducer from "./postsSlice";
import { usersApi } from "./api/usersApi";

// export const store = configureStore({
//   reducer: {
//     expenses: expenseReducer,
//     users: usersReducer,
//     posts: postsReducer,
//     [usersApi.reducerPath] : usersApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(usersApi.middleware),
// });
// store.subscribe(() => {
//   localStorage.setItem(
//     "expenses",
//     JSON.stringify(
//       store.getState().expenses.expenses
//     )
//   );
// });
export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
