const isFunction = require("util").isFunction;

const SYMBOLS = {
  x: "x",
  y: "y",
  z: "z",
  1: "1",
  n: "n",
  o: "o",
  r: "r",
  e: "e",
  s: "s"
};

let S = ch => {
  const t = {
    [SYMBOLS.x]: A,
    [SYMBOLS.z]: B,
    [SYMBOLS.y]: C,
    [SYMBOLS.n]: D
  };
  return t[ch];
};

let A = ch => {
  const t = {
    [SYMBOLS.x]: B,
    [SYMBOLS.y]: B,
    [SYMBOLS.z]: B,
    [SYMBOLS["1"]]: B,
    [SYMBOLS.o]: F,
    "": "indetefier"
  };
  return t[ch] || t[""];
};

let B = ch => {
  const t = {
    [SYMBOLS.x]: B,
    [SYMBOLS.y]: B,
    [SYMBOLS.z]: B,
    [SYMBOLS["1"]]: B,
    "": "indetefier"
  };
  return t[ch] || t[""];
};

let C = ch => {
  const t = {
    [SYMBOLS.x]: B,
    [SYMBOLS.y]: B,
    [SYMBOLS.z]: B,
    [SYMBOLS["1"]]: B,
    [SYMBOLS.e]: E,
    "": "indetefier"
  };
  return t[ch] || t[""];
};

let D = ch => {
  const t = {
    [SYMBOLS.o]: Z
  };
  return t[ch];
};

let E = ch => {
  const t = {
    [SYMBOLS.s]: Z
  };
  return t[ch];
};

let F = ch => {
  const t = {
    [SYMBOLS.r]: Z
  };
  return t[ch];
};

let Z = ch => {
  const t = {
    "": "key_word"
  };
  return t[ch] || t[""];
};

let run = line => {
  line = Array.from(line);
  let result = [];
  while (line.length) {
    let value = "";
    let shift = line.shift();
    let currentState = S(shift);
    let early = "";
    let earlyState;
    while (isFunction(currentState)) {
      if (
        isFunction(currentState) &&
        currentState("") &&
        currentState("").length
      ) {
        earlyState = currentState("");
        early = value + shift;
      }
      value += shift;
      shift = line.shift();
      currentState = currentState(shift);
    }
    if (currentState) {
      console.log(`< ${currentState}, ${value}>`);
      result.push({ value, type: currentState });
      line = [shift, ...line];
    } else if (!line.length) {
      console.log("end");
    } else {
      if (value.length) {
        console.log(`< ${earlyState}, ${early}>`);
        result.push({ early, type: earlyState });
        line = [...value.slice(early.length), shift, ...line];
      } else {
        console.log(`< ${earlyState}, ${shift}>`);
        result.push({ shift, type: earlyState });
      }
    }
  }
  return result;
};

module.exports = run;
