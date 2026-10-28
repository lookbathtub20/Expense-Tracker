import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ExpenseForm from './ExpenseForm.jsx'

// The harness owns the selected category and forwards submitted data to the test callback.
function ExpenseFormHarness({ onAddExpense }) {
  const [selectedCategory, setSelectedCategory] = useState('Food')

  return (
    <ExpenseForm
      onAddExpense={onAddExpense}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    />
  )
}

function submitExpense({ title = 'Lunch', amount = '12.5' } = {}) {
  fireEvent.change(screen.getByLabelText('Title'), { target: { value: title } })
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: amount } })
  fireEvent.click(screen.getByRole('button', { name: 'Add expense' }))
}

describe('ExpenseForm', () => {
  it('submits validated data with a trimmed title and numeric amount', () => {
    const onAddExpense = vi.fn()
    render(<ExpenseFormHarness onAddExpense={onAddExpense} />)

    submitExpense({ title: '  Lunch  ', amount: '12.5' })

    expect(onAddExpense).toHaveBeenCalledWith({
      title: 'Lunch',
      amount: 12.5,
      category: 'Food',
    })
    expect(screen.getByLabelText('Title')).toHaveValue('')
    expect(screen.getByLabelText('Amount')).toHaveValue('')
  })

  it('rejects an empty title and keeps the entered amount', () => {
    const onAddExpense = vi.fn()
    render(<ExpenseFormHarness onAddExpense={onAddExpense} />)

    submitExpense({ title: '   ', amount: '12.5' })

    expect(onAddExpense).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Enter an expense title.')
    expect(screen.getByLabelText('Amount')).toHaveValue('12.5')
  })

  it.each([
    { label: 'non-numeric input', amount: 'not-a-number' },
    { label: 'zero', amount: '0' },
    { label: 'a negative amount', amount: '-5' },
  ])('rejects $label', ({ amount }) => {
    const onAddExpense = vi.fn()
    render(<ExpenseFormHarness onAddExpense={onAddExpense} />)

    submitExpense({ amount })

    expect(onAddExpense).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter an amount greater than zero.',
    )
    expect(screen.getByLabelText('Amount')).toHaveValue(amount)
  })
})
