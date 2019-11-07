const wordCount = require("./wordCount");
const expect = require("expect.js");

// Need to handle new lines and tabs
const goodInputWithExpectedOutput = [
  { input: "", expectedOutput: 0 },
  { input: "A", expectedOutput: 1 },
  { input: "asdfaskjdfjas;ldjfk", expectedOutput: 1 },
  { input: "asdfaskjdfjas;ldjfk ", expectedOutput: 1 },
  { input: "The quick brown fox jumps.", expectedOutput: 5 },
  {
    input: "The quick brown fox jumps.\nHopefully this works too",
    expectedOutput: 9
  },
  {
    input:
      "This is a super long series of text with a comma, that makes sure it's right.",
    expectedOutput: 16
  }
];

describe("wordCount with good input", () => {
  goodInputWithExpectedOutput.map(({ input, expectedOutput }) => {
    it(`input of [${input}] should return word count of ${expectedOutput}`, () => {
      const result = wordCount(input);
      expect(result).to.equal(expectedOutput);
    });
  });
});
