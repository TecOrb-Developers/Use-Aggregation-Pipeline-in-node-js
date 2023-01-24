import { CustomError } from '../../../../../lib/errors';
import { IacOrgSettings } from './types';
import { Options, TestOptions } from '../../../../../lib/types';
export declare class FlagError extends CustomError {
    constructor(key: string);
}
export declare class IntegratedFlagError extends CustomError {
    constructor(key: string, org: string);
}
export declare class FeatureFlagError extends CustomError {
    constructor(key: string, featureFlag: string, hasSnykPreview?: boolean);
}
export declare class FlagValueError extends CustomError {
    constructor(key: string, value: string, supportedValues: string);
}
export declare class UnsupportedEntitlementFlagError extends CustomError {
    constructor(key: string, entitlementName: string);
}
export declare class UnsupportedEntitlementCommandError extends CustomError {
    constructor(key: string, entitlementName: string);
}
/**
 * Validates the command line flags passed to the snyk iac test
 * command. The current argument parsing is very permissive and
 * allows unknown flags to be provided without validation.
 *
 * For snyk iac we need to explicitly validate the flags to avoid
 * misconfigurations and typos. For example, if the --experimental
 * flag were to be misspelled we would end up sending the client
 * data to our backend rather than running it locally as intended.
 * @param argv command line args passed to the process
 */
export declare function assertIaCOptionsFlags(argv: string[]): void;
/**
 * Check that the flags used for the v1 flow do not contain any flag that are
 * only usable with the new integrated iac (v2) flow
 * @param settings organisation settings, used to get the org name
 * @param argv command line args
 */
export declare function assertIntegratedIaCOnlyOptions(settings: IacOrgSettings, argv: string[]): void;
export declare function assertTerraformPlanModes(scanModeArgValue: string): void;
export declare function isIacShareResultsOptions(options: Options & TestOptions): boolean | undefined;
export declare class InvalidArgumentError extends CustomError {
    constructor(key: string);
}
