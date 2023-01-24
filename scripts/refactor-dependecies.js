const fs = require("fs");

const libs = "./dist/libs";
const mainPackageJson = JSON.parse(fs.readFileSync(`./package.json`).toString());

filenames = fs.readdirSync(libs);

filenames.forEach((file) => {
  const packageJson = JSON.parse(fs.readFileSync(`${libs}/${file}/package.json`).toString());
  let peerDependencies = packageJson.peerDependencies;
  let dependencies = packageJson.dependencies;

  packageJson.repository = mainPackageJson.repository;

  Object.assign(dependencies, peerDependencies);

  Object.keys(peerDependencies).forEach((key) => {
    if (key !== "react" && key !== "react-router-dom") delete peerDependencies[key];
    if (file === "data-display") dependencies["react-table"] = "7.5.0";
  });

  const validPeers = ["react", "react-router-dom"];
  Object.keys(dependencies).forEach((key) => !validPeers.includes(key) || delete dependencies[key]);

  fs.writeFileSync(`${libs}/${file}/package.json`, JSON.stringify(packageJson));
});

filenames.forEach((file) => {
  const readme = `./README.md`;

  fs.copyFile(readme, `${libs}/${file}/README.md`, (err) => {
    if (err) return console.log(err);
  });
});

filenames.forEach((file) => {
  fs.readFile(`${libs}/${file}/README.md`, "utf8", function (err, data) {
    if (err) return console.log(err);

    const result = data
      .replace(
        "[@tiller-ds/core](https://www.npmjs.com/package/@tiller-ds/core)",
        `[@tiller-ds/${file}](https://www.npmjs.com/package/@tiller-ds/${file})`
      )
      .replace(
        "![](https://img.shields.io/npm/v/@tiller-ds/core/latest)",
        `![](https://img.shields.io/npm/v/@tiller-ds/${file}/latest)`
      );

    fs.writeFile(`${libs}/${file}/README.md`, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
});
