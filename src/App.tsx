import React, { ReactEventHandler, useState } from 'react';

import './App.css';

import { Typography, Layout, Button, Dropdown, Menu, Select, Progress, Space } from 'antd'
import { Col, Row } from 'antd';
import { buildBoard, generateTarget, isGameLaunchReady } from './lib/game/gameboard'
import { GameNumber, OperatorObj, EquationObj } from './lib/game/types';
import { timer } from './lib/timer';

import { GameboardWrapper } from './components/gameboard';
import { Tile } from './components/tile';

import { isNil } from 'lodash';
// import { getOperators } from './lib/game/arithmetic';

const { Title } = Typography
const { Header, Content, Sider } = Layout

function App() {
  const [gameboard, setGameboard] = useState<GameNumber[]>([])
  const [gameInProgress, setInProgress] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [target, setTarget] = useState(0)
  const [equation, setEquation] = useState<EquationObj>({} as EquationObj)

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

  const removeValueFromEquation = (position: string) => {
    setEquation({ ...equation, [position]: null })
  }

  const addTile = (tile: (GameNumber | OperatorObj), position: string) => setEquation((old: EquationObj) => ({ ...old, [position]: tile }))

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
              {gameboard.map((tile) => <Tile key={tile.id} tile={tile} clickHandler={(tile) => addTile(tile, equation.left ? 'right' : 'left' )} />)}
            </GameboardWrapper>

            {/* <Row>
              {gameInProgress &&
              getOperators().map(tile => <Col span={6}>
                <Tile tile={tile} key={tile.id} />
              </Col>)
              }
            </Row> */}

            <Row justify='center'>
              {!isNil(equation.left) &&
                <Col span={6}>
                  <Tile key={equation.left.id} tile={equation.left} clickHandler={() => removeValueFromEquation('left')} />
                </Col>
              }
              {!isNil(equation.op) &&
                <Col span={6}>
                  <Tile key={equation.left.id} tile={equation.op} clickHandler={() => removeValueFromEquation('op')} />
                </Col>
              }
              {!isNil(equation.right) &&
                <Col span={6}>
                  <Tile key={equation.right.id} tile={equation.right} clickHandler={() => removeValueFromEquation('right')} />
                </Col>
              }
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
