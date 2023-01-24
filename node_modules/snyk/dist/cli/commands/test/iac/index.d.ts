import { MethodArgs } from '../../../args';
import { TestCommandResult } from '../../types';
import { IaCTestFlags } from './local-execution/types';
export default function (...args: MethodArgs): Promise<TestCommandResult>;
export declare function getFlag(options: IaCTestFlags, flag: string): string | undefined;
