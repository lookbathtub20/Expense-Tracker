// ExpenseItem receives one expense through props; App owns the expense state.
function ExpenseItem({ expense }) {
  return (
    <li className="expense-row" data-cy="expense-item">
      <span>
        <strong data-cy="expense-item-title">{expense.title}</strong>
        <small data-cy="expense-item-category">{expense.category}</small>
      </span>
      <span className="expense-amount" data-cy="expense-item-amount">
        ${expense.amount.toFixed(2)}
      </span>
    </li>
  )
}

export default ExpenseItem
