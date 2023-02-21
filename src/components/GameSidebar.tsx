import { Button, Col, Row } from 'antd'
import { FC } from 'react'
import { getOperators } from '../lib/game/arithmetic'
import { Tile } from './Tile'
import { GameNumber } from '../lib/game/types'
import { useStore } from '../store/context'

type GameSidebarProps = {
    inProgress: boolean
    disabled: boolean
    gameboard: GameNumber[]
    target: number | string
    onStart: () => void
    onGenerate: () => void
    onOperatorSelect: (operatorId: string) => void
    onOperatorRemove: (operatorId: string) => void
}

export const GameSidebar: FC<GameSidebarProps> = (props) => {
    const { game } = useStore()
    const { board, equation } = game

    const { disabled, inProgress, target, onStart, onOperatorRemove, onGenerate } = props
    const options = Array.from(game.number_options, (number) => `${number} Large - ${6 - number} Small`)

    return (
        <>
            {!inProgress ?
                <>
                    {options.map((option, i) => <Button type='ghost' onClick={() => board.createBoard(game.number_options[i])}>{option}</Button>)}

                    <Button onClick={onGenerate}>Generate Target</Button>
                </>
                : null
            }

            <Button disabled={disabled} onClick={onStart}>
                {inProgress ? 'In progress' : 'Start'}
            </Button>
            <div>Target: {target}</div>

            <Row wrap>
                {game.isReady ?
                    getOperators().map((operator) => (
                        <Col span={6}>
                            <Tile
                                key={operator.id}
                                id={operator.id}
                                value={operator.symbol}
                                onClick={() => equation.addOperator(operator)}
                                onUndo={onOperatorRemove}
                            />
                        </Col>
                    ))
                    : null
                }
            </Row>
        </>
    )
}