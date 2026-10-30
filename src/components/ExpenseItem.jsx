// ExpenseItem receives an expense and delete callback through props; App owns expense state.
function ExpenseItem({ expense, onDeleteExpense }) {
  return (
    <li className="expense-row" data-cy="expense-item">
      <span>
        <strong data-cy="expense-item-title">{expense.title}</strong>
        <small data-cy="expense-item-category">{expense.category}</small>
      </span>
      <span className="expense-amount" data-cy="expense-item-amount">
        ${expense.amount.toFixed(2)}
      </span>
      <button
        type="button"
        data-cy="delete-expense"
        aria-label={`Delete ${expense.title}`}
        onClick={() => onDeleteExpense(expense.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default ExpenseItem
