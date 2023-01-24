import { CustomError } from './custom-error';
export declare class FailedToRunTestError extends CustomError {
    private static ERROR_MESSAGE;
    innerError: any | undefined;
    constructor(userMessage: any, errorCode?: any, innerError?: any);
}
