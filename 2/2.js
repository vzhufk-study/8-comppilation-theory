let D = line => {
  let match = line.match(/^[123]+/);
  if (!match) {
    throw new Error("Failed at D.");
  }
  return line.replace(/^[123]+/, "");
};
let V = line => {
  let match = line.match(/^[abc]/);
  if (!match) {
    throw new Error("Failed at V.");
  }
  line = line.replace(/^[abc]/, "");
  return D(line);
};
let C = line => {
  line = V(line);
  let match = line.match(/^(>=|=<)/);
  if (!match) {
    throw new Error("Failed at C.");
  }
  line = line.replace(/^(>=|=<)/, "");
  return V(line);
};
let S = line => {
  let match1 = line.match(/^if /);
  if (!match1) {
    throw new Error("Failed at S.");
  }
  line = line.replace(/^if /, "");
  line = C(line);
  let match2 = line.match(/^ then /);
  if (!match2) {
    throw new Error("Failed at S.");
  }
  line = line.replace(/^ then /, "");
  line = P(line);
  let match3 = line.match(/^ else /);
  if (!match3) {
    throw new Error("Failed at S.");
  }
  line = line.replace(/^ else /, "");
  return P(line);
};
let P = line => {
  let v1 = line;
  try {
    v1 = V(v1);
    let match = v1.match(/^:=/);
    if (!match) {
      throw new Error("Failed at P.");
    }
    v1 = v1.replace(/^:=/, "");
    return V(v1);
  } catch (e) {}

  let v2 = line;
  try {
    v2 = V(v2);
    let match = v2.match(/^:=/);
    if (!match) {
      throw new Error("Failed at P.");
    }
    v2 = v2.replace(/^:=/, "");
    return D(v2);
  } catch (e) {}

  let v3 = line;
  try {
    return S(v3);
  } catch (e) {}

  throw new Error("Failed at P.");
};

fs = require("fs");
fs.readFile(
  "C:/Users/vzhufk/Documents/Projects/compilation/lines.txt",
  "utf8",
  function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n");
    for (let i of data) {
      try {
        console.error(S(i));
        console.log("+:" + i);
      } catch (e) {
        console.log("-:" + i);
        console.error(e);
      }
    }
  }
);
