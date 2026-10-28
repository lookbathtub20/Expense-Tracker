const MAX_EXPENSE_AMOUNT = 100000

export function validateExpense({ title, amount, category }) {
  const errors = {}
  const normalizedTitle = typeof title === 'string' ? title.trim() : ''
  const numericAmount = Number(amount)

  if (!normalizedTitle) {
    errors.title = 'Enter an expense title.'
  }

  if (amount === '' || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    errors.amount = 'Enter an amount greater than zero.'
  } else if (numericAmount > MAX_EXPENSE_AMOUNT) {
    errors.amount = `Amount must be no more than ${MAX_EXPENSE_AMOUNT}.`
  }

  if (!category) {
    errors.category = 'Choose a category.'
  }

  return {
    errors,
    expense: {
      title: normalizedTitle,
      amount: numericAmount,
      category,
    },
  }
}
