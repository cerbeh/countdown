import React, { useState } from 'react';

import './App.css';

import { Typography, Layout, Button, Dropdown, Menu, Select, Progress } from 'antd'
import { Col, Row } from 'antd';
import { buildBoard, GameNumber, Gameboard, generateTarget, isGameLaunchReady, OperatorObj } from './lib/gameboard'
import { timer } from './lib/timer';


const { Title, Text } = Typography
const { Header, Content, Sider } = Layout
const { Option } = Select


function App() {
  const [largeNumbers, setLargeNumbers] = useState<number>(0)
  const [gameboard, setGameboard] = useState<GameNumber[]>([])
  const [gameInProgress, setInProgress] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [target, setTarget] = useState(0)
  const [ equation, setEquation ] = useState<(GameNumber | OperatorObj)[]>([])

  const handleBoardCreation = () => {
    const newGameboard = buildBoard({ large: largeNumbers })
    setGameboard(newGameboard)
  }

  const startGame = () => {
    setInProgress(!gameInProgress)
    timer(timeRemaining, setTimeRemaining, () => {
      setInProgress(false)
      setTimeRemaining(30)
    })
  }

  const handleTileClick = (event) => {
    const { val } = event?.target
    setEquation((oldArray) => [...oldArray, num])
  }

  return (
    <div className="App">
      <Layout>
        <Header className='App-header'>
          <Title level={1}>Countdown: NUMBERS</Title>
        </Header>

        <Layout>
          <Content>
            <Row>
              {gameboard.map(({ val, id }) =>
                <Col key={id} span={4}>
                  <div onClick={(event) => setEquation((oldArray) => [...oldArray, event.target])} typeof='button' className='Tile'>
                    {val}
                  </div>
                </Col>)}
            </Row>
            <Row>
              {[].map(() => <Col></Col>)}
            </Row>
          </Content>
          <Sider>
            <Button disabled={gameInProgress} onClick={handleBoardCreation}>Generate Board</Button>
            <Button disabled={gameInProgress} onClick={() => setTarget(generateTarget())}>Generate Target</Button>
            <Select disabled={gameInProgress} defaultValue={0} onChange={setLargeNumbers}>
              {Array.from({ length: 5 }, (_, i) => <Option value={i} children={undefined}></Option>)}
            </Select>

            <Button disabled={!isGameLaunchReady(target, gameboard) || gameInProgress} onClick={startGame}>{gameInProgress ? 'In progress' : 'Start'}</Button>
            {gameInProgress &&
              <div id='timer'>
                Time Remaining: {timeRemaining}
                <Progress showInfo={false} type="circle" percent={timeRemaining / 30 * 100} width={80}>{timeRemaining}</Progress>
              </div>}
            <div>Target: {target}</div>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
