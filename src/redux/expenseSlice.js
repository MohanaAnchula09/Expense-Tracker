import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",

  initialState: {
    expenses: JSON.parse(
      localStorage.getItem("expenses")
    ) || [],
  },

  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },

    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },

    editExpense: (state, action) => {
      const { id, title, amount, category } =
        action.payload;

      const expense = state.expenses.find(
        (expense) => expense.id === id
      );

      if (expense) {
        expense.title = title;
        expense.amount = amount;
        expense.category = category;
      }
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  editExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;