function ExpenseCard({ expense, onDelete, onEdit }) {
    return (
      <div>
        <h3>{expense.title}</h3>
        <p>₹{expense.amount}</p>
        <p>{expense.category}</p>
  
        <button type="button" onClick={() => onEdit(expense)}>
          Edit
        </button>
  
        <button type="button" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      </div>
    );
  }
  
  export default ExpenseCard;