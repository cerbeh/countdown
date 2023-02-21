import { Button, Col, Row, Typography } from 'antd'
import { isNil } from 'lodash';
import { useStore } from '../store';
import { FC } from 'react';

export const EquationBoard: FC = () => {
  const { game } = useStore()
  const equation = game.equation
  const COLUMN_SIZE = 4
  const TILE_STYLE = 'h-40 font-size[40]'
  return (
    <Row justify='center'>
      {!isNil(equation.left) ?
        <Col span={COLUMN_SIZE}>

          <div className={TILE_STYLE}>
            <Typography.Text>{equation.left.val}</Typography.Text>
          </div>
        </Col>
        : null}

      {
        !isNil(equation.op) ?
          <Col span={2}>

            <div className={TILE_STYLE}>
              <Typography.Text>{equation.op.symbol}</Typography.Text>
            </div>
          </Col>
          : null
      }

      {
        !isNil(equation.right) ?
          <Col span={COLUMN_SIZE}>
            <div className={TILE_STYLE}>
              <Typography.Text>{equation.right.val}</Typography.Text>
            </div>
          </Col>
          : null
      }
      {
        equation.isReady ?
          <Col span={COLUMN_SIZE}>
            <Button type='primary' onClick={() => game.calculateEquation()}>Submit</Button>
          </Col>
          : null
      }
    </Row >
  )
}

const Card: FC<{ value: string }> = ({ value }) => {
  return (
    <div style={{ height: 50, fontSize: 40 }}>
      <Typography.Text>{value}</Typography.Text>
    </div>
  )
}