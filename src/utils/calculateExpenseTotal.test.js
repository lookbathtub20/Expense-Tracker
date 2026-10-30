import { describe, expect, it } from 'vitest'
import { calculateExpenseTotal } from './calculateExpenseTotal.js'

describe('calculateExpenseTotal', () => {
  it('sums the amounts of multiple expenses', () => {
    expect(
      calculateExpenseTotal([
        { amount: 250 },
        { amount: 400 },
      ]),
    ).toBe(650)
  })

  it('returns zero when there are no expenses', () => {
    expect(calculateExpenseTotal([])).toBe(0)
  })
})
