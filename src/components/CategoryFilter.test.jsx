import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CategoryFilter from './CategoryFilter.jsx'

describe('CategoryFilter', () => {
  it('offers all supported categories and reports selection changes', () => {
    const onCategoryChange = vi.fn()
    render(
      <CategoryFilter selectedCategory="All" onCategoryChange={onCategoryChange} />,
    )

    const filter = screen.getByRole('combobox', { name: 'Filter by category' })
    expect(filter).toHaveAttribute('data-cy', 'filter')
    expect(Array.from(filter.options, (option) => option.value)).toEqual([
      'All',
      'Food',
      'Travel',
      'Bills',
      'Other',
    ])
    expect(filter).toHaveValue('All')

    fireEvent.change(filter, { target: { value: 'Food' } })
    expect(onCategoryChange).toHaveBeenLastCalledWith('Food')

    fireEvent.change(filter, { target: { value: 'All' } })
    expect(onCategoryChange).toHaveBeenLastCalledWith('All')
  })
})
