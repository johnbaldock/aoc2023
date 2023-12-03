import fs from "fs";

const input = fs.readFileSync("src/day3_input.txt", "utf8").split("\n");

const inRange = (num, a, b) => num >= a && num <= b;

const getAdjacentNumbersInLine = (line, gearMatch) => {
  const numberMatches = line.matchAll(/\d+/g);
  const adjacentNumbers = [...numberMatches]
    .filter((numberMatch) => {
      const numberMatchIndices = [
        numberMatch.index,
        numberMatch.index + numberMatch[0].length - 1,
      ];
      const gearMatchIndices = [
        Math.max(gearMatch.index - 1, 0),
        Math.min(gearMatch.index + 1, line.length),
      ];

      // Check if number overlaps gear
      return (
        inRange(numberMatchIndices[0], ...gearMatchIndices) ||
        inRange(numberMatchIndices[1], ...gearMatchIndices)
      );
    })
    .map((match) => match[0]);

  return adjacentNumbers;
};

const result = input.reduce((res, line, index) => {
  const gearRatios = [];
  const gearMatches = line.matchAll(/\*/g);
  [...gearMatches].forEach((gearMatch) => {
    // const prevLine = input[index - 1]?.slice(...boundaryIndices);
    // const nextLine = input[index + 1]?.slice(...boundaryIndices);
    // const currentLine = line?.slice(...boundaryIndices);
    // const isNextToSymbol = [prevLine, nextLine, currentLine]
    //   .filter((x) => x)
    //   .some((line) => /[^\d|\.]/.test(line));
    // if (isNextToSymbol) foundPartNumbers.push(parseInt(number));

    const prevLineNumberMatches = input[index - 1]
      ? getAdjacentNumbersInLine(input[index - 1], gearMatch)
      : [];
    const nextLineNumberMatches = input[index + 1]
      ? getAdjacentNumbersInLine(input[index + 1], gearMatch)
      : [];
    const currentLineNumberMatches = input[index - 1]
      ? getAdjacentNumbersInLine(line, gearMatch)
      : [];
    console.log(
      prevLineNumberMatches,
      nextLineNumberMatches,
      currentLineNumberMatches
    );
    const adjacentNumbers = [
      ...prevLineNumberMatches,
      ...nextLineNumberMatches,
      ...currentLineNumberMatches,
    ];

    if (adjacentNumbers.length == 2) {
      gearRatios.push(adjacentNumbers[0] * adjacentNumbers[1]);
    }
  });

  return res + gearRatios.reduce((res, x) => res + x, 0);
}, 0);

console.log(result);
