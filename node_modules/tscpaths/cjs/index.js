#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fs_1 = require("fs");
const globby_1 = require("globby");
const path_1 = require("path");
const util_1 = require("./util");
program
    .version('0.0.1')
    .option('-p, --project <file>', 'path to tsconfig.json')
    .option('-s, --src <path>', 'source root path')
    .option('-o, --out <path>', 'output root path')
    .option('-v, --verbose', 'output logs');
program.on('--help', () => {
    console.log(`
  $ tscpath -p tsconfig.json
`);
});
program.parse(process.argv);
const { project, src, out, verbose } = program;
if (!project) {
    throw new Error('--project must be specified');
}
if (!src) {
    throw new Error('--src must be specified');
}
const verboseLog = (...args) => {
    if (verbose) {
        console.log(...args);
    }
};
const configFile = path_1.resolve(process.cwd(), project);
const srcRoot = path_1.resolve(src);
const outRoot = out && path_1.resolve(out);
console.log(`tscpaths --project ${configFile} --src ${srcRoot} --out ${outRoot}`);
const { baseUrl, outDir, paths } = util_1.loadConfig(configFile);
if (!baseUrl) {
    throw new Error('compilerOptions.baseUrl is not set');
}
if (!paths) {
    throw new Error('compilerOptions.paths is not set');
}
if (!outDir) {
    throw new Error('compilerOptions.outDir is not set');
}
verboseLog(`baseUrl: ${baseUrl}`);
verboseLog(`outDir: ${outDir}`);
verboseLog(`paths: ${JSON.stringify(paths, null, 2)}`);
const configDir = path_1.dirname(configFile);
const basePath = path_1.resolve(configDir, baseUrl);
verboseLog(`basePath: ${basePath}`);
const outPath = outRoot || path_1.resolve(basePath, outDir);
verboseLog(`outPath: ${outPath}`);
const outFileToSrcFile = (x) => path_1.resolve(srcRoot, path_1.relative(outPath, x));
const aliases = Object.keys(paths)
    .map((alias) => ({
    prefix: alias.replace(/\*$/, ''),
    aliasPaths: paths[alias].map((p) => path_1.resolve(basePath, p.replace(/\*$/, ''))),
}))
    .filter(({ prefix }) => prefix);
verboseLog(`aliases: ${JSON.stringify(aliases, null, 2)}`);
const toRelative = (from, x) => {
    const rel = path_1.relative(from, x);
    return (rel.startsWith('.') ? rel : `./${rel}`).replace(/\\/g, '/');
};
const exts = ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.json'];
let replaceCount = 0;
const absToRel = (modulePath, outFile) => {
    const alen = aliases.length;
    for (let j = 0; j < alen; j += 1) {
        const { prefix, aliasPaths } = aliases[j];
        if (modulePath.startsWith(prefix)) {
            const modulePathRel = modulePath.substring(prefix.length);
            const srcFile = outFileToSrcFile(outFile);
            const outRel = path_1.relative(basePath, outFile);
            verboseLog(`${outRel} (source: ${path_1.relative(basePath, srcFile)}):`);
            verboseLog(`\timport '${modulePath}'`);
            const len = aliasPaths.length;
            for (let i = 0; i < len; i += 1) {
                const apath = aliasPaths[i];
                const moduleSrc = path_1.resolve(apath, modulePathRel);
                if (fs_1.existsSync(moduleSrc) ||
                    exts.some((ext) => fs_1.existsSync(moduleSrc + ext))) {
                    const rel = toRelative(path_1.dirname(srcFile), moduleSrc);
                    replaceCount += 1;
                    verboseLog(`\treplacing '${modulePath}' -> '${rel}' referencing ${path_1.relative(basePath, moduleSrc)}`);
                    return rel;
                }
            }
            console.log(`could not replace ${modulePath}`);
        }
    }
    return modulePath;
};
const requireRegex = /(?:import|require)\(['"]([^'"]*)['"]\)/g;
const importRegex = /(?:import|from) ['"]([^'"]*)['"]/g;
const replaceImportStatement = (orig, matched, outFile) => {
    const index = orig.indexOf(matched);
    return (orig.substring(0, index) +
        absToRel(matched, outFile) +
        orig.substring(index + matched.length));
};
const replaceAlias = (text, outFile) => text
    .replace(requireRegex, (orig, matched) => replaceImportStatement(orig, matched, outFile))
    .replace(importRegex, (orig, matched) => replaceImportStatement(orig, matched, outFile));
const files = globby_1.sync(`${outPath}/**/*.{js,jsx,ts,tsx}`, {
    dot: true,
    noDir: true,
}).map((x) => path_1.resolve(x));
let changedFileCount = 0;
const flen = files.length;
for (let i = 0; i < flen; i += 1) {
    const file = files[i];
    const text = fs_1.readFileSync(file, 'utf8');
    const prevReplaceCount = replaceCount;
    const newText = replaceAlias(text, file);
    if (text !== newText) {
        changedFileCount += 1;
        console.log(`${file}: replaced ${replaceCount - prevReplaceCount} paths`);
        fs_1.writeFileSync(file, newText, 'utf8');
    }
}
console.log(`Replaced ${replaceCount} paths in ${changedFileCount} files`);
//# sourceMappingURL=index.js.map