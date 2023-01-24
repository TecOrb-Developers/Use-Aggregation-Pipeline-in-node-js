import { PkgTree } from 'snyk-nodejs-lockfile-parser';
import { Options } from '../types';
import { DepGraph } from '@snyk/dep-graph';
export declare function parse(root: string, targetFile: string, options: Options): Promise<PkgTree | DepGraph>;
