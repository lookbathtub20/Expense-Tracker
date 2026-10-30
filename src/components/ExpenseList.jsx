import ExpenseItem from './ExpenseItem.jsx'

// ExpenseList receives expenses and a delete callback through props; App owns expense state.
function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <div data-cy="expense-list">
      {expenses.length === 0 ? (
        <p className="empty-state" data-cy="expense-empty-state">
          Your expenses will appear here.
        </p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              onDeleteExpense={onDeleteExpense}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList
