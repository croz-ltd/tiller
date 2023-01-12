const fs = require("fs");

const libs = "./dist/libs";

filenames = fs.readdirSync(libs);

filenames.forEach((file) => {
  const packageJson = JSON.parse(fs.readFileSync(`${libs}/${file}/package.json`).toString());
  let peerDependencies = packageJson.peerDependencies;
  let dependencies = packageJson.dependencies;

  Object.assign(dependencies, peerDependencies);

  Object.keys(peerDependencies).forEach((key) => {
    if (key !== "react" && key !== "react-router-dom") delete peerDependencies[key];
    if (file === "core") dependencies["@croz-internal/react-hooks"] = "0.0.1";
    if (file === "data-display") dependencies["react-table"] = "7.5.0";
  });

  const validPeers = ["react", "react-router-dom"];
  Object.keys(dependencies).forEach((key) => !validPeers.includes(key) || delete dependencies[key]);

  fs.writeFileSync(`${libs}/${file}/package.json`, JSON.stringify(packageJson));
});
