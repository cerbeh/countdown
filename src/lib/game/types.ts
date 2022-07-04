export type EquationObj = {
    left: GameNumber
    op: Operator
    right: GameNumber
}

export enum Operator {
    ADD = 'add',
    SUBTRACT = 'subtract',
    DIVIDE = 'divide',
    MULTIPLY = 'multiply',
}

export type OperatorObj = {
    id: string
    val: Operator
}

export type GameNumber = {
    id: string
    val: number
}

export type Gameboard = GameNumber[]