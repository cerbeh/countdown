import { add, subtract, multiply, divide, get, curry } from 'lodash';

const lookup = { add, subtract, multiply, divide }
const curriedGet = curry(get)
const lookupOperator = curriedGet(lookup);

type EquationObj = {
  left: number
  op: string
  right: number
}

export const equation = ({ left, op, right }: EquationObj): number => {
  const operatorFn = lookupOperator(op)
  return operatorFn(left, right)
}
