import fs from "fs";
import { execSync } from "child_process";

const pathToCDKPackage = __dirname + "/../../cdk";
const pathToCDKOut = `${pathToCDKPackage}/cdk.out`;

run();

function deleteDirs() {
  const dirs = fs.readdirSync(pathToCDKOut);

  console.log("Deleting asset directories...");

  const dirsToDelete = dirs
    .filter((dir) => dir.includes("asset."))
    .map((dir) => `${pathToCDKOut}/${dir}`);

  dirsToDelete.forEach((dir) => {
    fs.rmdirSync(dir, { recursive: true });
  });

  try {
    console.log("Synthesizing CDK assets...");
    execSync(`cd ${pathToCDKPackage} && yarn synth:api:local`);
  } catch (err) {
    console.log(
      "CDK synth failed because another `cdk synth` process is probably still running.  Wait a few seconds and try again."
    );
  }
}

function run() {
  const start = Date.now();

  deleteDirs();

  setTimeout(() => {
    const seconds = (Date.now() - start) / 1000;
    console.log(`API restarted in ${seconds} seconds.\n`);
  }, 500);
}
