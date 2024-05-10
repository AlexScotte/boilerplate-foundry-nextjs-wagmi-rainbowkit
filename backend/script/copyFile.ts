// import { Account, RpcProvider } from "starknet";
// import { declareAndDeployContract } from "./deployerHelper";
// import * as dotenv from "dotenv";
// import fs from "fs";
// import { CallData, json } from "starknet";
require("dotenv").config();
// dotenv.config();

const contractFrontFolder = "../../frontend/contracts";

async function main() {
  //   const nodeUrl = process.env.LOCAL_RPC;
  //   console.log(`💻⌛ Connection to provider ${nodeUrl}...`);

  const contractsToDeploy = [
    /** Contract 1: simple_storage/SimpleStorage with no args **/
    {
      contract_name: "SimpleStorage",
      args: ["0xa93C78a3375911a6F1feB2b259180560423FF1B3"],
    },
    /** Contract 2: simple_storage/SimpleStorage2 args **/
    // {
    //   package_name: "simple_storage",
    //   contract_name: "SimpleStorage2",
    //   args: {
    //     number_1: 1,
    //     number_2: 2,
    //   },
    // },
  ];

  for (const contract of contractsToDeploy) {

    try {
      await saveFrontendFiles(
        contract.contract_name,
        contract.args,
      );
    }
    catch (error) {
      throw new Error(`❌ ${error}`);
    }
  }
}


async function saveFrontendFiles(contractName, args) {
  const fs = require("fs");
  const path = require("path");


  const chainId = 11155111;

  const frontContractsDir = path.join(__dirname, contractFrontFolder);
  const frontContractFilePath = path.join(frontContractsDir, `${contractName}.json`);

  console.log(`📁 Frontend contract directory: ${frontContractsDir}`);
  if (!fs.existsSync(frontContractsDir)) {
    fs.mkdirSync(frontContractsDir, { recursive: true });
  }
  console.log("hoooooooooo")

  /** Read compiled contract file **/

  // TODO: Be careful with ne name of script
  const pathToContractFile = path.join(__dirname, `../broadcast/${contractName}.s.sol/${chainId}/run-latest.json`);
  const contractFile = JSON.parse(
    fs
      .readFileSync(
        pathToContractFile
      )
      .toString("ascii")
  );

  const transactions = contractFile["transactions"];
  if (!transactions) {
    throw new Error(`❌ Error when reading file at: ${pathToContractFile}`);
  }

  for (const transaction of transactions) {
    if (transaction["contractName"] == contractName) {


    }
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
