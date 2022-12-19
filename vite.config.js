
import * as fs from "fs";
import * as path from "path";

import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import copy from 'rollup-plugin-copy2'
import archiver from "archiver";

const archive = function (options) {
  return {
    name: "archive",
    writeBundle: {
      sequential: true,
      order: "post",
      async handler({ dir }, bundle) {
        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist");
        }

        let zipStream = archiver("zip", {
          zlib: {
            level: 9
          },
        });

        zipStream.pipe(
          fs.createWriteStream(`dist/static.zip`)
        );

        let tarStream = archiver("tar", {
          gzip: true,
          gzipOptions: {
            level: 1
          },
        });

        tarStream.pipe(
          fs.createWriteStream(`dist/static.tar.gz`)
        );

        let streams = [
          zipStream,
          tarStream,
        ];

        for(let stream of streams) {
          Object.entries(bundle).forEach(([, entry]) => {
            if (entry.type === 'asset') {
              const { fileName, source } = entry;

              stream.append(
                source,
                { name: fileName }
              );
            } else {
              const { fileName, map } = entry;

              stream.append(
                fs.createReadStream(path.resolve(dir, fileName)),
                { name: fileName }
              );

              if (map) {
                const mapFile = fileName + '.map';

                stream.append(
                  fs.createReadStream(path.resolve(dir, mapFile)),
                  { name: mapFile }
                );
              }
            }
          });

          stream.finalize();
        }
      }
    }
  };
};

export default defineConfig({
  build: {
    outDir: "static",
    sourcemap: true,
    manifest: true,
  },
  plugins: [
    eslintPlugin(),
    vue(),
    copy({
      assets: [
        ["public/favicon.ico", "favicon.ico"],
      ],
    }),
    archive(),
  ],
});
