import { TestCommandResult } from '../../../types';
import { IaCTestFlags } from '../local-execution/types';
export declare function test(paths: string[], options: IaCTestFlags): Promise<TestCommandResult>;
