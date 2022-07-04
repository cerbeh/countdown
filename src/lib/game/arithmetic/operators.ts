import { add, subtract, multiply, divide, get, curry } from 'lodash';
import { EquationObj } from '../types';

const lookup = { add, subtract, multiply, divide }
const curriedGet = curry(get)
const lookupOperator = curriedGet(lookup);



export const equation = ({ left, op, right }: EquationObj): number => {
  if ([left, op, right].some(e => e === null)) {
    return 0; // Wants to be null but need to check typing of EquationObj
  }
  const operatorFn = lookupOperator(op)
  return operatorFn(left, right)
}
