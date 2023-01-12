const fs = require("fs");

const workspace = JSON.parse(fs.readFileSync("workspace.json").toString());
const projects = workspace.projects;

const args = process.argv.slice(2);

const shouldBump = args[0] === "--bump";
const argVersion = args[1];

if (argVersion) {
  const rootPackage = JSON.parse(fs.readFileSync(`./package.json`).toString());
  const newVersion = getNewVersion(rootPackage);

  console.log(`Changing version to ${newVersion}`);

  Object.keys(projects).forEach((key) => {
    if (key.toString() !== "example" && key.toString() !== "storybook") {
      const root = projects[key].root;
      const projectPackage = JSON.parse(fs.readFileSync(`./${root}/package.json`).toString());

      const newPackage = {
        ...projectPackage,
        version: newVersion,
      };

      fs.writeFileSync(`./${root}/package.json`, JSON.stringify(newPackage, null, 2));
    }
  });

  const newRootPackage = {
    ...rootPackage,
    version: newVersion,
  };

  fs.writeFileSync(`./package.json`, JSON.stringify(newRootPackage, null, 2));
}

function getNewVersion(packageJson) {
  const { version } = packageJson;
  const [major, minor, patch] = version.split(".");

  let newVersion = argVersion;

  if (shouldBump) {
    if (argVersion === "major") {
      newVersion = `${parseInt(major) + 1}.0.0`;
    } else if (argVersion === "minor") {
      newVersion = `${major}.${parseInt(minor) + 1}.0`;
    } else if (argVersion === "patch") {
      newVersion = `${major}.${minor}.${parseInt(patch) + 1}`;
    }
  }

  return newVersion;
}
