import { makeAutoObservable } from "mobx";
import { GameNumber, OperatorObj } from "../lib/game/types";

export class Equation {
  left?: GameNumber
  right?: GameNumber
  op?: OperatorObj

  constructor() {
    makeAutoObservable(this)
  }

  addNumber(number: GameNumber, position: 'left' | 'right') {
    this[position] = number
  }

  addOperator = (operator: OperatorObj) => {
    this.op = operator
  }

  reset = () => {
    this.left = undefined
    this.right = undefined
    this.op = undefined
  }

  get isReady() {
    return [this.left, this.right, this.op].every(e => e !== undefined)
  }
  get isDirty() {
    return [this.left, this.right, this.op].some(e => e !== undefined)
  }
}