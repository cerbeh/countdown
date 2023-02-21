import { FC } from 'react'
import { Col, Row } from 'antd'

import { GameNumber } from '../lib/game/types'
import { Tile } from './Tile'
import { useStore } from '../store/context';

export const Gameboard: FC<{ gameboard: GameNumber[] }> = ({ gameboard }) => {
  const { game } = useStore()
  return (
    <Row gutter={[24, 16]}>
      {game.board.isReady || game.timer.isRunning ?
        gameboard.map((number) => (
          <Col span={4} key={number.id}>
            <Tile
              disabled={!game.timer.isRunning}
              id={number.id}
              value={number.val}
              onClick={() => game.equation.addNumber(number, game.equation.left ? 'right' : 'left')}
            />
          </Col>
        ))
        : null
      }
    </Row>
  )
}