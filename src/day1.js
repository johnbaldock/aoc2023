import fs from "fs";

const input = fs.readFileSync("src/day1_input.txt", "utf8").split("\n");

const digitDictionary = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const reversedDigitDictionary = digitDictionary.map((x) =>
  x.split("").reverse().join("")
);

const getStrDigitPrefix = (str, dictionary) => {
  let strDigit;
  dictionary.some((digit) => {
    if (str.startsWith(digit)) {
      strDigit = digit;
      return true;
    }
    return false;
  });

  return strDigit;
};

const findFirstDigit = (codeArr, dictionary) => {
  let digit;
  codeArr.some((char, index) => {
    const intOrNaN = parseInt(char, 10);
    const substrArr = codeArr.slice(index);
    const strDigit = getStrDigitPrefix(substrArr.join(""), dictionary);
    if (!isNaN(intOrNaN)) {
      digit = intOrNaN;
      return true;
    } else if (strDigit) {
      digit = dictionary.indexOf(strDigit) + 1;
      return true;
    }
    return false;
  });

  return digit;
};

const result = input.reduce((res, code) => {
  const firstDigit = findFirstDigit(code.split(""), digitDictionary);
  const lastDigit = findFirstDigit(
    code.split("").reverse(),
    reversedDigitDictionary
  );
  const value = parseInt([firstDigit, lastDigit].join(""));

  return res + value;
}, 0);
console.log(result);
