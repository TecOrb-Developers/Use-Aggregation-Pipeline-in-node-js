import { TestConfig } from './types';
import { TestOutput } from './scan/results';
export { TestConfig } from './types';
export declare function test(testConfig: TestConfig): Promise<TestOutput>;
