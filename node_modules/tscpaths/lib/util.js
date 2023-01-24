import { dirname, resolve } from 'path';
export const mapPaths = (paths, mapper) => {
    const dest = {};
    Object.keys(paths).forEach((key) => {
        dest[key] = paths[key].map(mapper);
    });
    return dest;
};
export const loadConfig = (file) => {
    const { extends: ext, compilerOptions: { baseUrl, outDir, paths } = {
        baseUrl: undefined,
        outDir: undefined,
        paths: undefined,
    }, } = require(file);
    const config = {};
    if (baseUrl) {
        config.baseUrl = baseUrl;
    }
    if (outDir) {
        config.outDir = outDir;
    }
    if (paths) {
        config.paths = paths;
    }
    if (ext) {
        const parentConfig = loadConfig(resolve(dirname(file), ext));
        return Object.assign({}, parentConfig, config);
    }
    return config;
};
//# sourceMappingURL=util.js.map