const base64ImageUtils = require("base64-image-utils");
const fs = require("fs");
const Buffer = require("buffer").Buffer;
const path = require("path");

/**
 * @param  {string} filename
 */
function encode_base64(filename) {
  fs.readFile(path.join(__dirname, "/images/", filename + ".jpg"), function (
    error,
    data
  ) {
    if (error) {
      throw error;
    } else {
      let buf = Buffer.from(data);
      let base64 = buf.toString("base64");
      fs.writeFileSync(
        path.join(__dirname, "/images/", filename + ".txt"),
        base64
      );
    }
  });
}

// encode .jpg image from ./images to a base64 string written in a .txt
encode_base64("sudoku1");
