import * as fs from "fs";
import * as path from "path";

import archiver from "archiver";

export default function archive(options = {}) {
  return {
    name: "archive",
    async writeBundle({ dir }, bundle) {
      if (!fs.existsSync("dist")) {
        fs.mkdirSync("dist");
      }

      let zipStream = archiver("zip", {
        zlib: {
          level: 9,
        },
      });

      zipStream.pipe(fs.createWriteStream(`dist/static.zip`));

      let tarStream = archiver("tar", {
        gzip: true,
        gzipOptions: {
          level: 1,
        },
      });

      tarStream.pipe(fs.createWriteStream(`dist/static.tar.gz`));

      let streams = [zipStream, tarStream];

      for (let stream of streams) {
        Object.entries(bundle).forEach(([, entry]) => {
          if (entry.type === "asset") {
            const { fileName, source } = entry;

            stream.append(source, { name: fileName });
          } else {
            const { fileName, map } = entry;

            stream.append(fs.createReadStream(path.resolve(dir, fileName)), {
              name: fileName,
            });

            if (map) {
              const mapFile = fileName + ".map";

              stream.append(fs.createReadStream(path.resolve(dir, mapFile)), {
                name: mapFile,
              });
            }
          }
        });

        stream.finalize();
      }
    },
  };
}
