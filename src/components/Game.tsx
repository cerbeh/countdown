import { Layout, Typography } from 'antd'
import { GameSidebar } from './GameSidebar';
import { Gameboard } from './Gameboard';
import { useStore } from '../store/context';
import { observer } from 'mobx-react-lite';
import { EquationBoard } from './EquationBoard';


export const Countdown = observer(() => {
  const { game } = useStore()
  const { timer, board, targetDisplay } = game

  return (
    <>
      <Layout.Content className="bg-slate-200 px-3">
        <div id='timer' className="text-black">
          Time Remaining: {timer.display}
          {/* <Progress showInfo={false} type="circle" percent={timeRemaining / 30 * 100} width={80}>{timeRemaining}</Progress> */}
        </div>

        {game.isReady
          ? <Gameboard gameboard={board.values} />
          : <Placeholder />}

        {game.isReady
          ? <EquationBoard />
          : null}

      </Layout.Content>

      <Layout.Sider className="bg-slate-200 px-2">
        <GameSidebar
          gameboard={board.values}
          inProgress={timer.isRunning}
          onStart={timer.start}
          target={targetDisplay}
          onGenerate={game.generateTarget}
          onOperatorRemove={() => console.log('removing')}
          onOperatorSelect={() => console.log('selecting')}
          disabled={!game.isReady}
        />
      </Layout.Sider>
    </>
  )
})

const Placeholder = () => {
  return (
    <Layout>
      <Layout.Header>
        <Typography.Title level={1}>SELECT YOUR NUMBERS</Typography.Title>
      </Layout.Header>
    </Layout>
  )
}
