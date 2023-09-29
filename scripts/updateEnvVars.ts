import fs from "fs";
import * as os from "os";
import qrcode from "qrcode-terminal";

const envPath = __dirname + "/../packages/web/main/.env";
const ipAddress = getIpAddress();

updateVars();

console.log("ALL IP ADDRESS ENV VARS UPDATED\n");

logQRCode();

function updateVars() {
  const absolutePath = envPath;

  console.log(`\nSetting IP address in .env to ${ipAddress}`);

  let content = fs.readFileSync(absolutePath, { encoding: "utf-8" });

  content = content.replace(/10\.0\.0\.\d*/g, ipAddress);

  fs.writeFileSync(absolutePath, content);
}

function logQRCode() {
  qrcode.setErrorLevel("Q");

  const webAppLocalAddress = `http://${ipAddress}:3000`;

  qrcode.generate(webAppLocalAddress, { small: true }, (code: any) => {
    console.log(`React App: ${webAppLocalAddress}`);
    console.log(code);
  });
}

function getIpAddress() {
  const nets = os.networkInterfaces();
  const results: { [key: string]: string[] } = {};

  for (const name of Object.keys(nets)) {
    const netInterface = nets[name];

    if (netInterface) {
      for (const net of netInterface) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
        if (net.family === familyV4Value && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }
  }

  const ipAddress = results.Ethernet?.[0] ?? results["Wi-Fi"][0];

  if (!ipAddress) {
    throw new Error(
      "An error occurred while retrieving the current IP address"
    );
  }

  return ipAddress;
}

export {};
