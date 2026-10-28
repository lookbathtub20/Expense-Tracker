import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import './App.css'

// App receives no props and owns the expense collection and selected category.
function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  function handleAddExpense(expense) {
    setExpenses((currentExpenses) => [...currentExpenses, expense])
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Your money, in focus</p>
        <h1>Expense tracker</h1>
        <p className="intro">Keep a clear record of what you spend.</p>
      </header>

      <ExpenseForm
        onAddExpense={handleAddExpense}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <section className="expense-list" aria-labelledby="expense-list-title">
        <div className="section-heading">
          <h2 id="expense-list-title">Recent expenses</h2>
          <span className="expense-count" aria-label={`${expenses.length} expenses`}>
            {expenses.length}
          </span>
        </div>
        {expenses.length === 0 ? (
          <p className="empty-state">Your expenses will appear here.</p>
        ) : (
          <ul>
            {expenses.map((expense, index) => (
              <li className="expense-row" key={`${expense.title}-${index}`}>
                <span>
                  <strong>{expense.title}</strong>
                  <small>{expense.category}</small>
                </span>
                <span className="expense-amount">${expense.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
