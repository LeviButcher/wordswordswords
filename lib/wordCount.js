const wordCount = string => {
  if (wordCount === "") return 0;
  return string.split(/\s|\n/).filter(x => x !== "").length;
};

module.exports = wordCount;
