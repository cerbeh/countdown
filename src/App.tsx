import React, { ReactEventHandler, useState } from 'react';

import './App.css';

import { Typography, Layout, Button, Dropdown, Menu, Select, Progress, Space } from 'antd'
import { Col, Row } from 'antd';
import { buildBoard, GameNumber, Gameboard, generateTarget, isGameLaunchReady, OperatorObj } from './lib/gameboard'
import { timer } from './lib/timer';
import { Tile } from './components/tile';
import { GameboardWrapper } from './components/gameboard';

import { filter, uniqueId, isNil } from 'lodash';

const { Title, Text } = Typography
const { Header, Content, Sider } = Layout
const { Option } = Select

function App() {
  const [gameboard, setGameboard] = useState<GameNumber[]>([])
  const [gameInProgress, setInProgress] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [target, setTarget] = useState(0)
  const [equation, setEquation] = useState<(GameNumber | OperatorObj)[]>([])

  const handleBoardCreation = (largeNumbers: number) => {
    const newGameboard = buildBoard({ large: largeNumbers })
    setGameboard(newGameboard)
  }

  const startGame = () => {
    setInProgress(true)
    timer(
      timeRemaining,
      setTimeRemaining,
      () => {
        setInProgress(false)
        setTimeRemaining(30)
      })
  }

  const filterEquationVal = (tile: (GameNumber | OperatorObj)) => {
    const newEquation = filter(equation, e => e.id !== tile.id)
    setEquation(newEquation)
  }
  const handleTileClick = (tile: (GameNumber | OperatorObj)) => setEquation((oldArray) => [...oldArray, tile])

  const optionCopy = (num: number) => `${num} Large - ${6 - num} Small`

  return (
    <div className="App">
      <Layout>
        <Header className='App-header'>
          <Title level={1}>Countdown: NUMBERS</Title>
        </Header>

        <Layout>
          <Content>
            <GameboardWrapper>
              {gameboard.map((tile) => <Tile<GameNumber> key={tile.id} tile={tile} clickHandler={handleTileClick} />)}
            </GameboardWrapper>

            <Row justify='center'>
                { !isNil(equation.left) && <Col span={6}>
                  <Tile key={e.id} tile={e} clickHandler={filterEquationVal} />
                </Col> }
            </Row>
          </Content>

          <Sider>
            {!gameInProgress && Array.from({ length: 5 }, (_, i) => <Button onClick={() => handleBoardCreation(i)} value={i}>{optionCopy(i)}</Button>)}
            {!gameInProgress && <Button onClick={() => setTarget(generateTarget())}>Generate Target</Button>}

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
