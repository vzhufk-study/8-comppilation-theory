const run = require("./index.js");
const path = require("path");

const fs = require("fs");
fs.readFile(path.resolve(__dirname, "lines.txt"), "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  fs.open(path.resolve(__dirname, "result.txt"), "w", (err, result) => {
    data = data.split("\n");
    for (let i of data) {
      let result = run(i);
      result.toString = function() {
        let s = "";
        for (let i of this) {
          s += `< ${i.type}, ${i.value}> `;
        }
        return s;
      };
      fs.appendFile(
        path.resolve(__dirname, "result.txt"),
        result.toString() + "\n",
        (err, data) => {
          if (err) {
            throw err;
          }
        }
      );
    }
  });
});
