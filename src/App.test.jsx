import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('shows the number of currently visible expense records', () => {
    render(<App />)

    const count = document.querySelector('[data-cy="count"]')
    const addExpense = (title, amount, category) => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: title },
      })
      fireEvent.change(screen.getByLabelText('Amount'), {
        target: { value: amount },
      })
      fireEvent.change(screen.getByLabelText('Category'), {
        target: { value: category },
      })
      fireEvent.click(screen.getByRole('button', { name: 'Add expense' }))
    }

    expect(count).toHaveTextContent('0')

    addExpense('Lunch', '50', 'Food')
    addExpense('Coffee', '10', 'Food')
    addExpense('Rent', '1000', 'Other')
    expect(count).toHaveTextContent('3')

    fireEvent.change(screen.getByLabelText('Filter by category'), {
      target: { value: 'Food' },
    })
    expect(count).toHaveTextContent('2')

    fireEvent.click(screen.getByRole('button', { name: 'Delete Lunch' }))
    expect(count).toHaveTextContent('1')

    fireEvent.change(screen.getByLabelText('Filter by category'), {
      target: { value: 'All' },
    })
    expect(count).toHaveTextContent('2')

    fireEvent.click(screen.getByRole('button', { name: 'Delete Coffee' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete Rent' }))
    expect(count).toHaveTextContent('0')
    expect(screen.getByText('Your expenses will appear here.')).toBeInTheDocument()
  })
})
