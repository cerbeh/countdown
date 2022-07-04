import { Operator } from '../types'
import { equation } from '../arithmetic/index'

describe('Gameboard', () => {
  it('Should return the correct sum result', () => {
    const result1 = equation({left: { val: 1, id: '1' }, op: Operator.ADD, right: {val: 2, id: '1'}})
    // const result2 = equation({left: { val: 1, id: '1' }, op: Operator.MULTIPLY, right: {val: 2, id: '1'}})
    // const result3 = equation({left: { val: 1, id: '1' }, op: Operator.DIVIDE, right: {val: 2, id: '1'}})
    // const result4 = equation({left: { val: 1, id: '1' }, op: Operator.SUBTRACT, right: {val: 2, id: '1'}})

    expect(result1).toBe(3)
    // expect(result2).toBe(2)
    // expect(result3).toBe(0.5)
    // expect(result4).toBe(-1)
  })
})
