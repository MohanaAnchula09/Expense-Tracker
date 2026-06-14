import { useState } from "react";
import ExpenseList from "./ExpensesList";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  deleteExpense,
  editExpense,
} from "../redux/expenseSlice";

const ExpensesForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  const expenses = useSelector(
    (state) => state.expenses.expenses
  );
  
  const dispatch = useDispatch();


  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(String(expense.amount));
    setCategory(expense.category);
    setEditingId(expense.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation
    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }
    
    if (!amount || Number(amount) <= 0) {
      setFormError("Amount must be greater than 0");
      return;
    }
    
    if (!category) {
      setFormError("Please select a category");
      return;
    }
    
    setFormError("");
  
    if (editingId) {
      dispatch(
        editExpense({
          id: editingId,
          title,
          amount: Number(amount),
          category,
        })
      );
    
      setEditingId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
      };
    
      dispatch(addExpense(newExpense));
    }
  
    setTitle("");
    setAmount("");
    setCategory("");
  };

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpense(id));
  };

      let displayedExpenses = expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchText.toLowerCase())
      );
      
      if (filterCategory !== "All") {
        displayedExpenses = displayedExpenses.filter(
          (expense) => expense.category === filterCategory
        );
      }
      
      if (sortBy === "amount") {
        displayedExpenses = [...displayedExpenses].sort(
          (a, b) => a.amount - b.amount
        );
      }
      
      if (sortBy === "category") {
        displayedExpenses = [...displayedExpenses].sort((a, b) =>
          a.category.localeCompare(b.category)
        );
      }

      const totalAmount = displayedExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );

      const categoryTotals = displayedExpenses.reduce((acc, expense) => {
        acc[expense.category] =
          (acc[expense.category] || 0) + expense.amount;
      
        return acc;
      }, {});

  return (
    <div>
      {formError && <p>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          value={amount}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>
        <input
            type="text"
            placeholder="Search expense"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">No Sort</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>

          {Object.entries(categoryTotals).map(([category, total]) => (
            <p key={category}>
              {category}: ₹{total}
            </p>
          ))}

          <ExpenseList
            expenses={displayedExpenses}
            onDelete={handleDeleteExpense}
            onEdit={handleEdit}
          />

          <h2>Total Amount: ₹{totalAmount}</h2>
          <h3>Total Expenses: {displayedExpenses.length}</h3>
    </div>
  );
};

export default ExpensesForm;