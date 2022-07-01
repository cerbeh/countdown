import { Col, Row } from 'antd'
import { PropsWithChildren } from 'react'

export const GameboardWrapper: React.FC<PropsWithChildren> = (props) => {
  return (
      <Row>
        {Array.isArray(props.children) && props.children.map((tile) => <Col span={4}>{tile}</Col>)}
      </Row>
  )
}
