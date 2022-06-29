import _ from "lodash";

const largeNumbers = () => Array.from({ length: 4 }, (_, i) => Number((i + 1) * 25))
const smallNumbers = () => Array.from({ length: 10 }, (_, i) => Number(i + 1))
const TOTAL_NUMBERS = 6

const equals = _.curry(_.isEqual);

export const buildBoard = (options: { large: number }): GameBoard => {

  return _.concat(
    selectNumbers(largeNumbers(), options.large),
    selectNumbers(_.concat(smallNumbers(), smallNumbers()), TOTAL_NUMBERS - options.large)
  )
}


const numberOptions = {
  large: largeNumbers(),
  small: _.concat(smallNumbers(), smallNumbers())
}

const selectNumbers = (toChooseFrom, quantity, selected = []) => {
  console.log(quantity, 'how many do we need?')
  if (quantity === 0) return selected
  const indexToChoose = _.floor(_.random(0, _.subtract(toChooseFrom.length, 1)))
  console.log(indexToChoose, 'indexToChoose')
  console.log(toChooseFrom, 'toChooseFrom')
  const num = _.nth(toChooseFrom, indexToChoose)
  console.log(num, 'num')

  return selectNumbers(
    _.filter(toChooseFrom, equals(num)),
    quantity - 1,
    _.concat(selected, num)
  )
}
