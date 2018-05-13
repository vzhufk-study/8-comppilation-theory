const run = require("./index.js");

const fs = require("fs");
fs.readFile(
  "C:/Users/vzhufk/Documents/Projects/compilation/3/lines.txt",
  "utf8",
  function(err, data) {
    if (err) {
      return console.log(err);
    }

    fs.open(
      "C:/Users/vzhufk/Documents/Projects/compilation/3/result.txt",
      "w",
      (err, result) => {
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
            "C:/Users/vzhufk/Documents/Projects/compilation/3/result.txt",
            result.toString() + "\n",
            (err, data) => {
              if (err) {
                throw err;
              }
            }
          );
        }
      }
    );
  }
);
