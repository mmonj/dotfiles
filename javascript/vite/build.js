/*
  Build script for Vite in order to bundle multiple scripts to UMD
  Intended to work around the following Vite restriction: 
    Multiple entry points are not supported when output formats include "umd" or "iife".
*/

import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import {
  getUserscriptPaths,
  prependCommentsToJsFiles,
  slugifyAndCapitalize,
} from "./build-util.js";

/**
 *
 * @param {string} inFile
 * @param {string} buildDir
 * @param {string} jsOutputName
 */
async function buildBundle(inFile, buildDir, jsOutputName) {
  const currentFileUrl = import.meta.url;
  const currentFilePath = fileURLToPath(currentFileUrl);

  try {
    await build({
      configFile: false,
      // root: "./",
      build: {
        emptyOutDir: false,
        minify: false,
        outDir: buildDir,
        sourcemap: false,
        target: "esnext",
        lib: {
          entry: inFile,
          name: slugifyAndCapitalize(jsOutputName, "MM"),
          fileName: () => jsOutputName,
          // fileName: (format, entryName) => `${entryName}.js`,
          formats: ["umd"],
        },
      },
      resolve: {
        alias: {
          "@lib": currentFilePath,
        },
      },
    });
  } catch (error) {
    console.error("Build failed:", error);
    return;
  }
  console.log("Build successful!");
}

getUserscriptPaths("./src").forEach(async (tsFilePath) => {
  const buildDir = "./dist/prod";

  const jsOutputName = path.basename(tsFilePath).replace(/\.ts$/, ".js");
  // const comments = parseInitialComments(tsFilePath);
  await buildBundle(tsFilePath, buildDir, jsOutputName);
  setTimeout(() => {
    prependCommentsToJsFiles(path.join(buildDir, jsOutputName), []);
  }, 500);
});
