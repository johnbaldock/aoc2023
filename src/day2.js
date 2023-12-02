import fs from "fs";

const input = fs.readFileSync("src/day2_input.txt", "utf8").split("\n");

const data = input.map((line) => {
  const [idStr, gameStr] = line.split(": ");
  const id = parseInt(idStr.slice(5));
  const sets = gameStr.split("; ").map((setStr) => {
    const redMatch = setStr.match(/(\d*) red/);
    const greenMatch = setStr.match(/(\d*) green/);
    const blueMatch = setStr.match(/(\d*) blue/);

    return [
      redMatch ? parseInt(redMatch[1]) : 0,
      greenMatch ? parseInt(greenMatch[1]) : 0,
      blueMatch ? parseInt(blueMatch[1]) : 0,
    ];
  });
  return [id, sets];
});

console.log(data[0]);

const result = data.reduce((res, [id, sets]) => {
  const maxRed = Math.max(...sets.map((set) => set[0]));
  const maxGreen = Math.max(...sets.map((set) => set[1]));
  const maxBlue = Math.max(...sets.map((set) => set[2]));

  //   const foundId = maxRed <= 12 && maxGreen <= 13 && maxBlue <= 14 ? id : 0;

  const power = maxRed * maxGreen * maxBlue;

  return res + power;
}, 0);

console.log(result);
