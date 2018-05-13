const run = require("./index.js").run;
const get_token = require("./index.js").get_token;
let fs = require("fs");
fs.readFile(
  "C:/Users/vzhufk/Documents/Projects/compilation/2/lines.txt",
  "utf8",
  function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n");
    for (let i of data) {
      try {
        console.log(get_token(i).toString());
        console.error(run(i));
        console.log("+:" + i);
      } catch (e) {
        console.log("-:" + i);
        console.error(e);
      }
    }
  }
);
