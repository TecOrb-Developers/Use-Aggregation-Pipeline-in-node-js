import { IacTestResponse } from '../../snyk-test/iac-test-result';
import * as sarif from 'sarif';
export declare function createSarifOutputForIac(iacTestResponses: IacTestResponse[]): sarif.Log;
