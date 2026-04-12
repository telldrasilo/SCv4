import { describe, it, expect } from 'vitest'

describe('Vitest setup', () => {
  it('runs a basic assertion', () => {
    expect(1 + 1).toBe(2)
  })

  it('resolves async code', async () => {
    const result = await Promise.resolve('swordcraft')
    expect(result).toBe('swordcraft')
  })
})
