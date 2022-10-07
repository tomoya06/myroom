import fs from "fs-extra";
import ghpages from "gh-pages";

fs.copySync("./src/assets/", "./dist/assets/");
ghpages.publish('dist');
