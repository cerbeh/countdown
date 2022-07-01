import { add, subtract, multiply, divide, get, curry } from 'lodash';

const lookup = { add, subtract, multiply, divide }
const curriedGet = curry(get)
const lookupOperator = curriedGet(lookup);

export const equation = ([a, b, op]: [number, number, string]): number => {
  const operatorFn = lookupOperator(op)
  return operatorFn(a, b)
}
