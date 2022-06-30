import { curry, isEqual, concat, floor, random, subtract, nth, filter  } from 'lodash';

const largeNumbers = () => Array.from({ length: 4 }, (_, i) => ({ id: i, val: Number((i + 1) * 25)}))
const smallNumbers = () => Array.from({ length: 10 }, (_, i) => ({ id: i, val: Number(i + 1)}))
const TOTAL_NUMBERS = 6

const equals = curry(isEqual);

export const buildBoard = (options: { large: number }) => {
  const selectedLargeNumbers = selectNumbers(largeNumbers(), options.large)
  const selectedSmallNumbers = selectNumbers(concat(smallNumbers(), smallNumbers()), TOTAL_NUMBERS - options.large)
  return concat(
    selectedLargeNumbers,
    selectedSmallNumbers
  )
}

export type GameNumber = {
  id: string
  val: number
}

export type Gameboard = GameNumber[]

const selectNumbers: any = (toChooseFrom: number[], quantity: number, selected = []) => {

  if (quantity === 0){
    return selected
  }

  const indexToChoose = floor(random(0, subtract(toChooseFrom.length, 1)))
  const num = nth(toChooseFrom, indexToChoose)

  return selectNumbers(
    filter(toChooseFrom, equals(num)),
    quantity - 1,
    concat(selected, num)
  )
}
