import { fold, unfold, unfoldAll } from '.'
import { GameNumber, Operator } from '../types'
import _ from 'lodash'

const PrimitiveTwo: GameNumber = { id: 'primitiveTwo', val: 2 }
const PrimitiveTen: GameNumber = { id: 'primitiveTen', val: 10 }
const CalculatedTwelve: GameNumber = { id: 'calculatedTwelve', val: 12, left: PrimitiveTen, right: PrimitiveTwo, operator: Operator.ADD }

describe('Gameboard', () => {
  it('Should be able to fold and expand calculated numbers', () => {
    const result = fold({ left: PrimitiveTen, right: PrimitiveTwo, op: Operator.ADD})
    expect(result.val).toEqual(12)
    expect(result.left).toEqual(PrimitiveTen)
    expect(result.right).toEqual(PrimitiveTwo)

    const { id, ...mockNumber } = CalculatedTwelve; // remove id as these are generated
    expect(result).toEqual(expect.objectContaining(mockNumber))
  })

  it('Should unfold numbers', () => {
    const result = unfold(CalculatedTwelve)

    expect(result[0]).toEqual(PrimitiveTen)
    expect(result[1]).toEqual(PrimitiveTwo)
  })

  it('Should unfold all numbers in complex array', () => {
    const CalculatedTwenty = { id: 'calculatedTwenty', val: 20, left: PrimitiveTen, right: PrimitiveTwo, operator: Operator.MULTIPLY }
    const CalculatedTwentyTwo = { id: 'calculatedTwentyTwo', val: 22, left: CalculatedTwelve, right: PrimitiveTen, operator: Operator.ADD }
    const numbers = [ CalculatedTwelve, CalculatedTwenty, PrimitiveTen, PrimitiveTwo, CalculatedTwentyTwo ]

    const result = unfoldAll(numbers)
    expect(result).toHaveLength(9)
  })
})
