
import { Layout, Col, Row } from 'antd'
const { Header, Content, Sider } = Layout

export function Gameboard({ tiles: ReactElement[] }) {
  return (
    <Content>
      <Row>
        {tiles.map(tile => <Col span={4}>{tile}</Col>)}
      </Row>
    </Content>
  )
}
