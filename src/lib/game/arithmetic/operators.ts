import { add, subtract, multiply, divide, get, curry } from 'lodash';
import { EquationObj, Operator } from '../types';

const operatorLookup = { add, subtract, multiply, divide }

export const equation = ({ left, op, right }: EquationObj): number => {
  if ([left, op, right].some(e => e === null)) {
    return 0; // Wants to be null but need to check typing of EquationObj
  }
  const operatorFn = get(operatorLookup, op)
  return operatorFn(left.val, right.val)
}
