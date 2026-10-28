import ExpenseItem from './ExpenseItem.jsx'

// ExpenseList receives expenses through props and renders them; App owns the expense state.
function ExpenseList({ expenses }) {
  return (
    <div data-cy="expense-list">
      {expenses.length === 0 ? (
        <p className="empty-state" data-cy="expense-empty-state">
          Your expenses will appear here.
        </p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <ExpenseItem expense={expense} key={expense.id} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList
