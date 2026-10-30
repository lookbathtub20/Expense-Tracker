import { describe, expect, it } from 'vitest'
import { validateExpense } from './validateExpense.js'

describe('validateExpense', () => {
  it('accepts a valid title, amount, and category', () => {
    expect(
      validateExpense({ title: 'Lunch', amount: '250', category: 'Food' }),
    ).toEqual({
      errors: {},
      expense: {
        title: 'Lunch',
        amount: 250,
        category: 'Food',
      },
    })
  })

  it.each([
    { label: 'blank', title: '' },
    { label: 'whitespace-only', title: '   ' },
  ])('rejects a $label title', ({ title }) => {
    const result = validateExpense({
      title,
      amount: '250',
      category: 'Food',
    })

    expect(result.errors.title).toBe('Enter an expense title.')
    expect(result.expense.title).toBe('')
  })
})
