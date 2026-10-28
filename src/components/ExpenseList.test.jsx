import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ExpenseList from './ExpenseList.jsx'

describe('ExpenseList', () => {
  it('renders each expense with its title, formatted amount, and category', () => {
    render(
      <ExpenseList
        expenses={[
          { id: 1, title: 'Lunch', amount: 250, category: 'Food' },
          { id: 2, title: 'Bus fare', amount: 12.5, category: 'Transportation' },
        ]}
      />,
    )

    const items = document.querySelectorAll('[data-cy="expense-item"]')
    expect(items).toHaveLength(2)
    expect(within(items[0]).getByText('Lunch')).toBeInTheDocument()
    expect(within(items[0]).getByText('$250.00')).toBeInTheDocument()
    expect(within(items[0]).getByText('Food')).toBeInTheDocument()
    expect(within(items[1]).getByText('Bus fare')).toBeInTheDocument()
    expect(within(items[1]).getByText('$12.50')).toBeInTheDocument()
    expect(within(items[1]).getByText('Transportation')).toBeInTheDocument()
  })

  it('displays an empty-state message when there are no expenses', () => {
    render(<ExpenseList expenses={[]} />)

    expect(screen.getByText('Your expenses will appear here.')).toHaveAttribute(
      'data-cy',
      'expense-empty-state',
    )
    expect(document.querySelector('[data-cy="expense-item"]')).not.toBeInTheDocument()
  })
})
