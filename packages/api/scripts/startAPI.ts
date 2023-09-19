import fs from "fs";
import { ChildProcess, exec, execSync, spawn } from "child_process";

const pathToCDKPackage = __dirname + "/../../cdk";
const pathToCDKOut = `${pathToCDKPackage}/cdk.out`;

let samProcess: ChildProcess | null = null;

run();

function startSamLocalAPI() {
  console.log("\nRunning `sam build`...");

  execSync(`yarn build`);

  console.log("Starting new SAM process...");
  samProcess = spawn("yarn", ["dev"], {
    stdio: "inherit",
    shell: true,
  });
}

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
    execSync(`cd ${pathToCDKPackage} && cdk synth`);
  } catch (err) {
    console.log(
      "CDK synth failed because another `cdk synth` process is probably still running.  Wait a few seconds and try again."
    );
  }
}

function run() {
  const start = Date.now();

  if (samProcess) {
    console.log("Killing existing SAM process...");
    samProcess.kill("SIGTERM");
  }

  deleteDirs();

  setTimeout(() => {
    startSamLocalAPI();

    const seconds = (Date.now() - start) / 1000;
    console.log(`API restarted in ${seconds} seconds.\n`);
  }, 500);
}
