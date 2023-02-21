import { Button, Col, Row, Typography } from 'antd'
import { isNil } from 'lodash';
import { useStore } from '../store';
import { FC } from 'react';

export const EquationBoard: FC = () => {
  const { game } = useStore()
  const equation = game.equation
  const COLUMN_SIZE = 4
  return (
    <>

      <Row justify='center' className='h-40'>
        {!isNil(equation.left) ?
          <Col span={COLUMN_SIZE}>
            <Card value={equation.left.val} />
          </Col>
          : null}

        {
          !isNil(equation.op) ?
            <Col span={2}>
              <Card value={equation.op.symbol} />
            </Col>
            : null
        }

        {
          !isNil(equation.right) ?
            <Col span={COLUMN_SIZE}>
              <Card value={equation.right.val} />
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
      {equation.isDirty ?
        <Row justify="end">

          <Col span={COLUMN_SIZE} slot='right'>
            <Button type='primary' onClick={equation.reset}>Reset</Button>
          </Col>
        </Row>
        : null
      }
    </>
  )
}

const Card: FC<{ value: string | number }> = ({ value }) => {
  return (
    <div className="font-size[40]">
      <Typography.Text>{value}</Typography.Text>
    </div>
  )
}