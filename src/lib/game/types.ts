export type EquationObj = {
    left: GameNumber
    op: Operator
    right: GameNumber
}

export enum Operator {
    'add',
    'subtract',
    'divide',
    'multiply',
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