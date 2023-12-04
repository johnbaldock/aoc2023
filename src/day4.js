import fs from "fs";

const input = fs.readFileSync("src/day4_input.txt", "utf8").split("\n");

const result = input
  .reduce((numCopies, line, index) => {
    const [_, gameStr] = line.split(": ");
    const [winningNumbers, myNumbers] = gameStr.split(" | ").map((setStr) =>
      setStr
        .trim()
        .split(/\s+/)
        .map((x) => parseInt(x))
    );
    const matches = winningNumbers.filter((x) => myNumbers.includes(x));
    const numMatches = matches.length;

    for (let i = index; i < numMatches + index; i++) {
      if (i + 1 < input.length) {
        numCopies[i + 1] = numCopies[i + 1] + numCopies[index];
      }
    }

    return numCopies;
  }, new Array(input.length).fill(1))
  .reduce((sum, val) => sum + val, 0);

console.log(result);
