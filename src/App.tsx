import React, { useState } from 'react';

import './App.css';

import { Typography, Layout, Button, Dropdown, Menu } from 'antd'
import { Col, Row } from 'antd';
import { buildBoard } from './lib/gameboard'


const { Title } = Typography
const { Header, Content, Sider } = Layout

function App() {
  // const numbers = (
  //   <Menu items={Array.from({length: 4}, (_, i) => ({ key: Math.random(), val: i))}/>
  // )
  const [ largeNumbers, setLargeNumbers ] = useState(2)
  const [ gameboard, setGameboard] = useState(buildBoard({ large: largeNumbers }))

  return (
    <div className="App">
      <Layout>
        <Header className='App-header'>
          <Title level={1}>Countdown</Title>
          <Title level={4}>NUMBERS</Title>
        </Header>

        <Layout>
        <Content>
          <Row>
            {gameboard.map(num => <Col span={8}>{num.val}</Col>)}
          </Row>
        </Content>
        <Sider>
          {/* <Dropdown></Dropdown> */}
          {/* <Button onClick={setGameboard}>Click</Button> */}
        </Sider>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
