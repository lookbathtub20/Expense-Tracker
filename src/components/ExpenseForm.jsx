import { useState } from 'react'
import { validateExpense } from '../utils/validateExpense.js'

const CATEGORIES = [
  'Food',
  'Housing',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Other',
]

// ExpenseForm receives the selected category and callbacks as props; App owns the category state.
function ExpenseForm({ onAddExpense, selectedCategory, onCategoryChange }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()
    const { errors: validationErrors, expense } = validateExpense({
      title,
      amount,
      category: selectedCategory,
    })

    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    onAddExpense(expense)
    setTitle('')
    setAmount('')
  }

  function handleFieldChange(field, value, updateValue) {
    updateValue(value)
    if (errors[field]) {
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }))
    }
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <h2>Add an expense</h2>
        <p>Enter the details below to keep your spending up to date.</p>
      </div>

      <div className="form-fields">
        <div className="field-group">
          <label htmlFor="expense-title">Title</label>
          <input
            id="expense-title"
            data-cy="expense-title"
            type="text"
            value={title}
            onChange={(event) =>
              handleFieldChange('title', event.target.value, setTitle)
            }
            placeholder="e.g. Weekly groceries"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'expense-title-error' : undefined}
          />
          {errors.title && (
            <p className="field-error" id="expense-title-error" data-cy="title-error" role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="expense-amount">Amount</label>
          <div className="amount-input-wrap">
            <span aria-hidden="true">$</span>
            <input
              id="expense-amount"
              data-cy="expense-amount"
              type="text"
              inputMode="decimal"
              min="0.01"
              max="100000"
              step="any"
              value={amount}
              onChange={(event) =>
                handleFieldChange('amount', event.target.value, setAmount)
              }
              placeholder="0.00"
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? 'expense-amount-error' : undefined}
            />
          </div>
          {errors.amount && (
            <p className="field-error" id="expense-amount-error" data-cy="amount-error" role="alert">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            data-cy="expense-category"
            value={selectedCategory}
            onChange={(event) => {
              onCategoryChange(event.target.value)
              if (errors.category) {
                setErrors((currentErrors) => ({ ...currentErrors, category: undefined }))
              }
            }}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? 'expense-category-error' : undefined}
          >
            <option value="">Choose a category</option>
            {CATEGORIES.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="field-error" id="expense-category-error" data-cy="category-error" role="alert">
              {errors.category}
            </p>
          )}
        </div>
      </div>

      <button className="submit-button" data-cy="add-expense" type="submit">
        Add expense
      </button>
    </form>
  )
}

export default ExpenseForm
