import { add, subtract, multiply, divide, get, curry } from 'lodash';

const lookup = { add, subtract, multiply, divide }
const curriedGet = curry(get)
const lookupOperator = curriedGet(lookup);

type equation = [number, string, number]

export const equation = ([left, op, right]: equation): number => {
  const operatorFn = lookupOperator(op)
  return operatorFn(left, right)
}
