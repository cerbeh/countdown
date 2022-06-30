import React, { useState } from 'react';

import './App.css';

import { Typography, Layout, Button, Dropdown, Menu, Select } from 'antd'
import { Col, Row } from 'antd';
import { buildBoard, GameNumber, Gameboard } from './lib/gameboard'


const { Title, Text } = Typography
const { Header, Content, Sider } = Layout
const { Option } = Select


function App() {
  const [ largeNumbers, setLargeNumbers ] = useState<number>(0)
  const [ gameboard, setGameboard] = useState<GameNumber[]>([])

  const handleBoardCreation = () => {
    const newGameboard = buildBoard({ large: largeNumbers }) 
    setGameboard(newGameboard)
  }

  return (
    <div className="App">
      <Layout>
        <Header className='App-header'>
          <Title level={1}>Countdown</Title>
          <Title level={4}>NUMBERS</Title>
          {/* <Text>
            {`${largeNumbers} 'LargeNumbers'
          ${gameboard} - gameboard`}
          </Text> */}
        </Header>

        <Layout>
        <Content>
          <Row>
            {gameboard.map(num => <Col span={4}>{num.val}</Col>)}
          </Row>
        </Content>
        <Sider>
            <Button onClick={handleBoardCreation}>Click</Button>
            <Select defaultValue={0} onChange={setLargeNumbers}>
              {Array.from({ length: 5 }, (_, i) => <Option value={i} children={undefined}></Option>)}
            </Select>
        </Sider>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
