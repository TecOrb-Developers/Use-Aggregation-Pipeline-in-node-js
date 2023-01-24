import { TestOutput } from '../scan/results';
import { TestConfig } from '../types';
import { IacAnalytics } from './index';
declare type IacCloudContext = Pick<IacAnalytics, 'iacCloudContext' | 'iacCloudContextCloudProvider' | 'iacCloudContextSuppressedIssuesCount'>;
export declare function getIacCloudContext(testConfig: TestConfig, testOutput: TestOutput): IacCloudContext;
export {};
