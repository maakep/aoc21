const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");
module.exports = () => {
  const finals = [];
  for (const startPath of viablePathsFrom("start", [])) {
    const previousSmallPaths = [];
    const currentPath = ["start"];

    if (isLower(startPath)) previousSmallPaths.push(startPath);

    traverse(startPath, previousSmallPaths, currentPath, finals);
  }
  console.log(finals);

  return finals.length;
};

function traverse(path, previousSmallPaths, currentPath, finals) {
  const viableNextPaths = viablePathsFrom(path, previousSmallPaths);
  // console.log(
  //   currentPath.join(" > "),
  //   ">",
  //   path,
  //   "Next:",
  //   viableNextPaths,
  //   "Without:",
  //   previousSmallPaths
  // );
  currentPath.push(path);

  for (const newPath of viableNextPaths) {
    if (currentPath.at(-1) == "end") {
      finals.push(currentPath);
      // console.log("## ", currentPath.join(" -> "), "\n");
      return;
    }

    const newPrevSmallPath = [...previousSmallPaths];
    if (isLower(newPath)) newPrevSmallPath.push(newPath);

    traverse(newPath, newPrevSmallPath, [...currentPath], finals);
  }

  return currentPath;
}

function viablePathsFrom(pathKeyFrom, previousSmallPaths) {
  return input
    .filter((x) => {
      const val = Object.values(x)[0];
      const key = Object.keys(x)[0];

      return val == pathKeyFrom || key == pathKeyFrom;
    })
    .map((x) => {
      const val = Object.values(x)[0];
      const key = Object.keys(x)[0];
      const target = key == pathKeyFrom ? val : key;
      return target;
    })
    .filter(
      (x) =>
        (hasDuplicate(previousSmallPaths)
          ? !previousSmallPaths.includes(x)
          : true) && x != "start"
    );
}

function hasDuplicate(array) {
  return new Set(array).size !== array.length;
}

function isLower(pathKey) {
  return (
    pathKey == pathKey.toLowerCase() && pathKey != "start" && pathKey != "end"
  );
}
