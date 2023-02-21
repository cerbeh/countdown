import { isEqual, concat, random, subtract, nth, filter, uniqueId, reduce } from 'lodash';
import { executeEquation } from '../arithmetic';
import { Operator, Board, EquationObj, PrimitiveGameNumber, GameNumber, CalculatedGameNumber } from '../types'

declare const TOTAL_NUMBERS = 6
const LOWER_TARGET = 101
const HIGHER_TARGET = 999

const getOperators = () => Object.keys(Operator)

const createNumbersArray = (length: number, indexMutator: (n: number) => number): PrimitiveGameNumber[] => Array.from({ length }, (_, i) => createPrimitiveNumber(indexMutator(i), 'primitive'))

const largeNumberRange = (): PrimitiveGameNumber[] => createNumbersArray(4, i => Number((i + 1) * 25))
const smallNumberRange = (): PrimitiveGameNumber[] => createNumbersArray(10, i => Number(i + 1))

export const buildBoard = (options: { large: number }) => {
  const largeNumbers = selectNumbers(largeNumberRange(), options.large)
  const smallNumbers = selectNumbers(concat(smallNumberRange(), smallNumberRange()), TOTAL_NUMBERS - options.large)

  return concat(
    largeNumbers as { id: string, val: number }[],
    smallNumbers as { id: string, val: number }[]
  )
}

type NumberSelectorRecursive = (numbers: { id: string, val: number }[], quantity: number, selected?: { id: string, val: number }[]) => { id: string, val: number }[] | NumberSelectorRecursive
const selectNumbers: NumberSelectorRecursive = (numbers: { id: string, val: number }[], quantity: number, selected: { id: string, val: number }[] = []) => {

  if (quantity === 0) {
    return selected
  }

  const indexToChoose = random(0, subtract(numbers.length, 1))
  const num = nth(numbers, indexToChoose)

  if (!num) {
    return selected
  }

  return selectNumbers(
    filter(numbers, e => !isEqual(num?.id, e.id)),
    quantity - 1,
    concat<{ id: string, val: number }>(selected, num)
  )
}

export const randomTarget = () => random(LOWER_TARGET, HIGHER_TARGET)
export const isGameLaunchReady = (num: number, gameboard: Board) => gameboard.length === 6 && num > LOWER_TARGET && num < HIGHER_TARGET

export const fold = ({ left, op, right }: EquationObj): CalculatedGameNumber => ({
  id: uniqueId('calculated'),
  val: executeEquation({ left, right, op }),
  operator: op,
  left,
  right,
})

export const unfold = (num: CalculatedGameNumber): GameNumber[] => [num.left, num.right]

export const unfoldAll = (nums: Board): Board => {

  const allPrimitive = nums.every(isPrimitiveNumber)

  if (allPrimitive) {
    return nums
  }
  const unfoldedNums = reduce(nums, unfoldReducer, [])
  return unfoldAll(unfoldedNums)
}

// function unfoldAll(toUnfold: T): T {

// }

const unfoldReducer = (numbers: Board, currentNumber: GameNumber): Board => {
  return concat(
    [] as Board,
    numbers,
    isCalculatedNumber(currentNumber) ? unfold(currentNumber as CalculatedGameNumber) : currentNumber
  )
}

const createPrimitiveNumber = (num: number, id_prefix: string): PrimitiveGameNumber => ({
  id: uniqueId(id_prefix),
  val: num,
})

function isPrimitiveNumber(number: GameNumber) {
  return (number as PrimitiveGameNumber).id.includes('primitive')
}
function isCalculatedNumber(number: GameNumber) {
  return (number as CalculatedGameNumber).id.includes('calculated')
}