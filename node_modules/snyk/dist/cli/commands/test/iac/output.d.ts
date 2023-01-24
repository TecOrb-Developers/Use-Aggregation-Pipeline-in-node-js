import { TestCommandResult } from '../../types';
import * as ora from 'ora';
import { IacFileInDirectory, IacOutputMeta, Options, TestOptions } from '../../../../lib/types';
import { IaCTestFlags } from './local-execution/types';
export declare function buildSpinner(options: IaCTestFlags): ora.Ora | undefined;
export declare function printHeader(options: IaCTestFlags): void;
export declare function buildOutput({ results, options, isIacShareCliResultsCustomRulesSupported, isIacCustomRulesEntitlementEnabled, iacOutputMeta, iacScanFailures, iacIgnoredIssuesCount, testSpinner, }: {
    results: any[];
    options: Options & TestOptions;
    isIacShareCliResultsCustomRulesSupported: boolean;
    isIacCustomRulesEntitlementEnabled: boolean;
    iacOutputMeta: IacOutputMeta;
    iacScanFailures: IacFileInDirectory[];
    iacIgnoredIssuesCount: number;
    testSpinner?: ora.Ora;
}): TestCommandResult;
export declare function buildShareResultsSummary({ orgName, projectName, options, isIacCustomRulesEntitlementEnabled, isIacShareCliResultsCustomRulesSupported, }: {
    orgName: string;
    projectName: string;
    options: IaCTestFlags;
    isIacCustomRulesEntitlementEnabled: boolean;
    isIacShareCliResultsCustomRulesSupported: boolean;
}): string;
export declare function buildShareResultsSummaryV2({ orgName, projectName, options, isIacCustomRulesEntitlementEnabled, isIacShareCliResultsCustomRulesSupported, }: {
    orgName: string;
    projectName: string;
    options: IaCTestFlags;
    isIacCustomRulesEntitlementEnabled: boolean;
    isIacShareCliResultsCustomRulesSupported: boolean;
}): string;
export declare function shouldPrintShareResultsTip(options: IaCTestFlags): boolean;
