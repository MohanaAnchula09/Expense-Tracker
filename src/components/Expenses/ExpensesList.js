import ExpenseCard from "./ExpensesCard";

function ExpenseList({ expenses, onDelete, onEdit }) {
    if (expenses.length === 0) {
        return <p>No expenses found.</p>;
      }

  return (
    <div>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ExpenseList;