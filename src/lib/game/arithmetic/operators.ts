import { add, subtract, multiply, divide, get, uniqueId } from 'lodash';
import { EquationObj, Operator, OperatorObj } from '../types';

const operatorLookup = { add, subtract, multiply, divide }
const operatorSymbolLookup = {
  [Operator.ADD]: '+',
  [Operator.SUBTRACT]: '-',
  [Operator.MULTIPLY]: 'x',
  [Operator.DIVIDE]: String.fromCharCode(247)
}

export const executeEquation = ({ left, op, right }: EquationObj): number => {
  if ([left, op, right].some(e => e === null)) {
    return 0; // Wants to be null but need to check typing of EquationObj
  }
  const operatorFn = get(operatorLookup, op)
  return operatorFn(left.val, right.val)
}

export const getOperators = (): OperatorObj[] => Object.values(Operator).map(op => ({ val: op, id: uniqueId('operator'), symbol: operatorSymbolLookup[op] }))