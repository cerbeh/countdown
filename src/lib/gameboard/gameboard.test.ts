import { buildBoard, GameNumber, isGameLaunchReady } from '.'
import _ from 'lodash'

describe('Gameboard', () => {
  it('Should return the correct numbers', () => {
    const result = buildBoard({ large: 2 })
    expect(result).toHaveLength(6)
    expect(_.filter(result, (n: GameNumber) => n.val > 10)).toHaveLength(2)
  })
  it('Should validate game readiness', () => {
    const result = isGameLaunchReady(102, buildBoard({ large: 0 }))
    expect(result).toEqual(true)
  })
})
