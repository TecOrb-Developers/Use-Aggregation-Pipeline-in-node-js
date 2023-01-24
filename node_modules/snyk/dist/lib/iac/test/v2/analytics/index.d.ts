import { ResourceKind, TestOutput } from '../scan/results';
import { IacType } from './iac-type';
import { TestConfig } from '../types';
export interface IacAnalytics {
    iacType: IacType;
    packageManager: ResourceKind[];
    iacIssuesCount: number;
    iacIgnoredIssuesCount: number;
    iacFilesCount: number;
    iacResourcesCount: number;
    iacErrorCodes: number[];
    iacTestBinaryVersion: string;
    iacCloudContext?: string;
    iacCloudContextCloudProvider?: string;
    iacCloudContextSuppressedIssuesCount: number;
}
export declare function addIacAnalytics(testConfig: TestConfig, testOutput: TestOutput): void;
