import { equation } from '.'

describe('Gameboard', () => {
  it('Should return the correct sum result', () => {
    const result1 = equation([1,'add', 2])
    const result2 = equation([1,'multiply', 2])
    const result3 = equation([1,'divide', 2])
    const result4 = equation([1,'subtract', 2])

    expect(result1).toBe(3)
    expect(result2).toBe(2)
    expect(result3).toBe(0.5)
    expect(result4).toBe(-1)
  })
})
