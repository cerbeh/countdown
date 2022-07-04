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

export type ResultGameNumber = {
    id: string
    val: number
    left: GameNumber
    right: GameNumber
    operator: Operator
}

export type PrimitiveGameNumber = {
  id: string
  val: number
}

export type GameNumber = PrimitiveGameNumber | ResultGameNumber

export type Gameboard = GameNumber[]
