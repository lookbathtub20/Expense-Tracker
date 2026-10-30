import { useRef, useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import { calculateExpenseTotal } from './utils/calculateExpenseTotal.js'
import './App.css'

// App receives no props and owns the expense collection and selected category.
function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const nextExpenseId = useRef(1)

  function handleAddExpense(expense) {
    const expenseWithId = { ...expense, id: nextExpenseId.current }
    nextExpenseId.current += 1
    setExpenses((currentExpenses) => [...currentExpenses, expenseWithId])
  }

  function handleDeleteExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    )
  }

  const visibleExpenses = selectedFilter === 'All'
    ? expenses
    : expenses.filter((expense) => expense.category === selectedFilter)
  const visibleExpenseTotal = calculateExpenseTotal(visibleExpenses)

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
          <span
            className="expense-count"
            data-cy="count"
            aria-label={`${visibleExpenses.length} expenses`}
          >
            {visibleExpenses.length}
          </span>
        </div>
        <p>Total: <span data-cy="total">{visibleExpenseTotal.toFixed(2)}</span></p>
        <CategoryFilter
          selectedCategory={selectedFilter}
          onCategoryChange={setSelectedFilter}
        />
        <ExpenseList expenses={visibleExpenses} onDeleteExpense={handleDeleteExpense} />
      </section>
    </main>
  )
}

export default App
