import { SEVERITY } from '../../../../snyk-test/legacy';
import { ResourceKind, TestOutput } from '../scan/results';
export declare function getIacType(testOutput: TestOutput): IacType;
export declare type PackageManager = ResourceKind;
export declare type IacType = {
    [packageManager in PackageManager]?: {
        count: number;
        'resource-count': number;
    } & {
        [severity in SEVERITY]?: number;
    };
};
export declare type ResourcesCountByPackageManager = {
    [packageManager in PackageManager]?: number;
};
export declare type FilesCountByPackageManager = {
    [packageManager in PackageManager]?: number;
};
export declare type VulnerabilityAnalyticsByPackageManager = {
    [packageManager in PackageManager]?: VulnerabilityAnalitycs;
};
export declare type VulnerabilityAnalitycs = {
    [severity in SEVERITY]?: number;
};
