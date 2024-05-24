import { promises as fs } from "fs";
import * as path from "path";
import { glob } from "glob";

const getAssetPathsMapper = (ctx, srcDir) => {
  const normalizeSrcFile = (srcFile) => {
    srcFile = path.normalize(srcFile);

    if (!path.isAbsolute(srcFile)) {
      srcFile = path.resolve(srcDir, srcFile);
    }

    if (process.platform === "win32") {
      srcFile = srcFile.replace(/\\+/g, "/");
    }

    return srcFile;
  };

  return (asset) => {
    if (typeof asset === "string") {
      return [normalizeSrcFile(asset), asset, false];
    }

    if (Array.isArray(asset) && asset.length === 2) {
      const [srcFile, fileName] = asset;
      return [normalizeSrcFile(srcFile), fileName, true];
    }

    ctx.error("Asset should be a string or a pair of strings [string, string]");
  };
};

export default function copy(options = {}) {
  return {
    name: "copy",
    async generateBundle() {
      const assets = [["public/favicon.ico", "favicon.ico"]];
      const notEmitFiles = false;

      const srcDir = process.cwd();

      let { outputDirectory: outDir } = options;

      if (outDir && !path.isAbsolute(outDir)) {
        outDir = path.resolve(srcDir, outDir);
      }

      const pathMapper = getAssetPathsMapper(this, srcDir);

      for (let [srcFile, fileName, assetIsPair] of assets.map(pathMapper)) {
        const files = await glob(srcFile);

        if (files.length === 0) {
          this.error(`"${srcFile}" doesn't exist`);
        }

        if (files.length > 1 && assetIsPair) {
          this.error(
            `Cannot mix glob "${srcFile}" pattern for assets with [string, string] notation`,
          );
        }

        for (const file of files) {
          if (!assetIsPair) {
            fileName = path.relative(srcDir, file);
          }

          const source = await fs.readFile(file);

          if (!notEmitFiles) {
            this.emitFile({
              fileName,
              source,
              type: "asset",
            });
          }

          if (outDir) {
            const filePath = path.resolve(outDir, fileName);

            await fs.mkdir(path.dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, source);
          }
        }
      }
    },
  };
}
