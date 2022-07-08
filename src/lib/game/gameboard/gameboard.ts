import { isEqual, concat, random, subtract, nth, filter, uniqueId, reduce } from 'lodash';
import { executeEquation } from '../arithmetic';
import { Operator, Gameboard, EquationObj, PrimitiveGameNumber, GameNumber, CalculatedGameNumber } from '../types'
const TOTAL_NUMBERS = 6
const LOWER_TARGET = 101
const HIGHER_TARGET = 999

const getOperators = () => Object.keys(Operator)

const largeNumbers = (): PrimitiveGameNumber[] => Array.from({ length: 4 }, (_, i) => createPrimitiveNumber(Number((i + 1) * 25), 'primitive'))
const smallNumbers = (): PrimitiveGameNumber[] => Array.from({ length: 10 }, (_, i) => ({ id: uniqueId('primitive'), val: Number(i + 1) }))

export const buildBoard = (options: { large: number }) => {
  const selectedLargeNumbers = selectNumbers(largeNumbers(), options.large)
  const selectedSmallNumbers = selectNumbers(concat(smallNumbers(), smallNumbers()), TOTAL_NUMBERS - options.large)

  return concat(
    selectedLargeNumbers,
    selectedSmallNumbers
  )
}

const selectNumbers: any = (toChooseFrom: { id: string, val: number }[], quantity: number, selected = []) => {

  if (quantity === 0) {
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

export const fold = ({ left, op, right }: EquationObj): CalculatedGameNumber => ({
  id: uniqueId('calculated'),
  val: executeEquation({ left, right, op }),
  operator: op,
  left,
  right,
})

export const unfold = (num: CalculatedGameNumber): GameNumber[] => [num.left, num.right]

export const unfoldAll = (nums: Gameboard): Gameboard => {

  const allPrimitive = nums.every(isPrimitiveNumber)

  if (allPrimitive) {
    return nums
  }
  const unfoldedNums = reduce(nums, unfoldReducer, [])
  return unfoldAll(unfoldedNums)
}

const unfoldReducer = (numbers: Gameboard, currentNumber: GameNumber): Gameboard => {
  return concat(
    [] as Gameboard,
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