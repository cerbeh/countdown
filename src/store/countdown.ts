import { Difficulty, buildBoard } from "../lib/game/gameboard";
import { Board as Gameboard } from "../lib/game/types";
import { makeAutoObservable } from "mobx";
import { Equation } from "./equation";
import { TimerStore } from "./timer";
import { fold, randomTarget } from "../lib/game/numbers";

export class CountdownStore {
  timer: TimerStore
  readonly number_options: Difficulty[] = [0, 1, 2, 3, 4]
  equation: Equation
  board: Board
  target: number | null

  constructor() {
    this.equation = new Equation()
    this.timer = new TimerStore()
    this.board = new Board()
    this.target = null
    makeAutoObservable(this)
  }

  get isReady() {
    const fullBoard = this.board.isReady
    const hasTarget = this.target !== null
    const isRunning = this.timer.isRunning
    return (fullBoard && hasTarget) || isRunning
  }

  generateTarget = () => {
    this.target = randomTarget()
  }

  get targetDisplay() {
    return this.target ?? '000'
  }

  calculateEquation() {
    const { left, right, op } = this.equation
    if (!left || !right || !op) {
      throw Error('Equation not ready')
    }
    const unusedNumbers = this.board.values.filter(n => n.id !== left.id && n.id !== right.id)
    const newNumber = fold({ left, right, op: op.val })
    this.board.values = [...unusedNumbers, newNumber]
    this.equation.reset()
  }

}

class Board {
  values: Gameboard = []
  constructor() {
    makeAutoObservable(this)
  }

  get isReady() {
    return this.values.length === 6
  }

  createBoard = (difficulty: Difficulty) => {
    this.values = buildBoard({ large: difficulty })
  }
}