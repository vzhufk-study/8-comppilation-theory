const isFunction = require("util").isFunction;

const SYMBOLS = {
  a: "a",
  b: "b",
  c: "c",
  0: "0",
  1: "1",
  2: "2",
  d: "d"
};

let S = ch => {
  const t = {
    [SYMBOLS.a]: A,
    [SYMBOLS.b]: A,
    [SYMBOLS.c]: A,
    [SYMBOLS.d]: B,
    [SYMBOLS["1"]]: C,
    [SYMBOLS["2"]]: C,
    [SYMBOLS["0"]]: C
  };
  return t[ch];
};

let A = ch => {
  const t = {
    [SYMBOLS.a]: A,
    [SYMBOLS.b]: A,
    [SYMBOLS.c]: A,
    [SYMBOLS["1"]]: A,
    [SYMBOLS["2"]]: A,
    "": "identifier"
  };
  return t[ch] || t[""];
};

let B = ch => {
  const t = {
    [SYMBOLS.d]: B,
    "": "identifier"
  };
  return t[ch] || t[""];
};

let C = ch => {
  const t = {
    [SYMBOLS["1"]]: C,
    [SYMBOLS["2"]]: C,
    [SYMBOLS["0"]]: C,
    "": "number"
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
        if (earlyState) {
          console.log(`< ${earlyState}, ${early}>`);
        }
        result.push({ early, type: earlyState });
        line = [...value.slice(early.length), shift, ...line];
      } else {
        if (earlyState) {
          console.log(`< ${earlyState}, ${shift}>`);
        }
        result.push({ shift, type: earlyState });
      }
    }
  }
  return result;
};

module.exports = run;
