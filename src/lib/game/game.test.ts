import { buildBoard } from './'
import _ from 'lodash'

describe('Gameboard', () => {
  it('Should return the correct numbers', () => {
    const result = buildBoard({ large: 2 })
    expect(result).toHaveLength(6)
    expect(_.filter(result, n => n > 10)).toHaveLength(2)
  })
})
