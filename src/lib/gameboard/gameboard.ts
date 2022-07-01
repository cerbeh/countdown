import { curry, isEqual, concat, floor, random, subtract, nth, filter, uniqueId  } from 'lodash';

const TOTAL_NUMBERS = 6
const LOWER_TARGET = 101
const HIGHER_TARGET = 999

enum Operator {
  'add',
  'minus',
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

const getOperators = () => Object.keys(Operator)

export type Gameboard = GameNumber[]

const largeNumbers = () => Array.from({ length: 4 }, (_, i) => ({ id: uniqueId('large'), val: Number((i + 1) * 25)}))
const smallNumbers = () => Array.from({ length: 10 }, (_, i) => ({ id: uniqueId('small'), val: Number(i + 1)}))
const equals = curry(isEqual);

export const buildBoard = (options: { large: number }) => {
  const selectedLargeNumbers = selectNumbers(largeNumbers(), options.large)
  const selectedSmallNumbers = selectNumbers(concat(smallNumbers(), smallNumbers()), TOTAL_NUMBERS - options.large)

  return concat(
    selectedLargeNumbers,
    selectedSmallNumbers
  )
}

const selectNumbers: any = (toChooseFrom: { id: string, val: number}[], quantity: number, selected = []) => {

  if (quantity === 0){
    return selected
  }

  const indexToChoose = random(0, subtract(toChooseFrom.length, 1))
  const num = nth(toChooseFrom, indexToChoose)

  return selectNumbers(
    filter(toChooseFrom, e => !isEqual(num?.id, e.id)),
    quantity - 1,
    concat(selected, num)
  )
}

export const generateTarget = () => random(LOWER_TARGET, HIGHER_TARGET)
export const isGameLaunchReady = (num: number, gameboard: Gameboard) => gameboard.length === 6 && num > LOWER_TARGET && num < HIGHER_TARGET