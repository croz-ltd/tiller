const fs = require("fs");

function get_line(filename, line_no, callback) {
  const data = fs.readFileSync("./node_modules/phosphor-icons/src/css/icons.css", "utf8");
  const lines = data.split("\n");

  if (+line_no > lines.length) {
    throw new Error("File end reached without finding line");
  }
  callback(null, lines[+line_no]);
}

const icons = [];

for (let i = 8475; i <= 12660; i = i + 4) {
  get_line("./node_modules/phosphor-icons/src/css/icons.css", i, function (err, line) {
    icons.push(line.replace(".ph-", "").replace("::before {", ""));
  });
}

const stream = fs.createWriteStream("./libs/icons/src/iconClasses.ts");
stream.once("open", function () {
  stream.write("export const iconTypes = [");
  stream.write(icons.map(icon => `"${icon}"`).join(", "));
  stream.write("] as const;");
  stream.end();
});
