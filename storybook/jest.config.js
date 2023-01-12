module.exports = {
  displayName: "storybook",
  preset: "../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  coverageDirectory: "../../coverage/storybook",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
