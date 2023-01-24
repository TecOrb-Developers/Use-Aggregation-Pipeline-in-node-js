/// <reference types="node" />
import * as needle from 'needle';
import { OutgoingHttpHeaders } from 'http';
import { NeedleHttpVerbs } from 'needle';
interface RequestInfo {
    method: NeedleHttpVerbs;
    path: string;
    body: any;
    headers?: OutgoingHttpHeaders;
    qs?: {};
    json?: boolean;
    timeout?: number;
    family?: number;
}
export declare function snykHttpClient(requestInfo: RequestInfo): Promise<{
    res: needle.NeedleResponse;
    body: any;
}>;
export {};
