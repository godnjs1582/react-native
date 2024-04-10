import {NativeModules} from 'react-native';

export const executeCalculator = (
  action: 'plus' | 'minus' | 'divide' | 'multiply',
  numbA: number,
  numbB: number,
): Promise<number> => {
  return NativeModules.CalculatorModule.executeCalc(action, numbA, numbB);
};
