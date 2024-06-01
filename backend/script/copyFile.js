require("dotenv").config();

const contractFrontFolder = "../../src/frontend/contracts";

const network = {};

async function main() {
  const args = process.argv[2];
  if (args === "mainnet") {
    network.name = args;
    network.chainId = 1;
  } else if (args === "sepolia") {
    network.name = args;
    network.chainId = 11155111;
  } else {
    network.name = "localhost";
    network.chainId = 31337;
  }

  console.log(`🔗 Current network ${network.name} - ${network.chainId}  `);

  const contractsToDeploy = [
    /** Contract 1: SimpleStorage**/
    {
      contract_name: "SimpleStorage",
    },
  ];

  for (const contract of contractsToDeploy) {
    try {
      await saveFrontendFiles(contract.contract_name);
    } catch (error) {
      throw new Error(`❌ ${error}`);
    }
  }
}

async function saveFrontendFiles(contractName) {
  const fs = require("fs");
  const path = require("path");

  const chainId = network.chainId;
  const networkName = network.name;

  const frontContractsDir = path.join(__dirname, contractFrontFolder);
  const frontContractFilePath = path.join(
    frontContractsDir,
    `${contractName}.json`
  );

  console.log(`📁 Frontend contract directory: ${frontContractsDir}`);
  if (!fs.existsSync(frontContractsDir)) {
    fs.mkdirSync(frontContractsDir, { recursive: true });
  }

  const pathToCompiledContractFile = path.join(
    __dirname,
    `../out/${contractName}.sol/${contractName}.json`
  );
  console.log(
    `📁 Backend compiled contract artifact path: ${pathToCompiledContractFile}`
  );

  const pathToDeployedContractFile = path.join(
    __dirname,
    `../broadcast/${contractName}.s.sol/${chainId}/run-latest.json`
  );
  console.log(
    `📁 Backend deployed contract artifact path: ${pathToDeployedContractFile}`
  );

  /** Read compiled contract file to get the ABI**/
  const compiledContractFile = JSON.parse(
    fs.readFileSync(pathToCompiledContractFile).toString("ascii")
  );

  const abi = compiledContractFile["abi"];
  if (!abi) {
    throw new Error(
      `❌ Error when reading the abi in file: ${pathToCompiledContractFile}`
    );
  }

  let previousArtifact = {};
  let currentArtifact = {};
  let abiChanged = false;

  currentArtifact["abi"] = abi;

  try {
    // Read previous deployed artifact
    previousArtifact = JSON.parse(
      fs.readFileSync(frontContractFilePath, "utf8")
    );

    // If the contract changed, we remove all previous network informations
    if (
      JSON.stringify(currentArtifact.abi) !=
      JSON.stringify(previousArtifact.abi)
    ) {
      abiChanged = true;
      console.log(
        "🔄 ABI changed, you need to redeploy the contract on all networks"
      );
    }
  } catch (err) {
    console.error("❌ No previous artifact");
    previousArtifact = currentArtifact;
  }

  // Write deployed contract informations in a file
  console.log(
    `🖍️  Write deployed ${contractName} informations in ${frontContractFilePath}`
  );
  if (abiChanged || !previousArtifact.hasOwnProperty("networks")) {
    previousArtifact.networks = {};
  }

  // Create chain ID node in networks section
  if (!previousArtifact.networks.hasOwnProperty(chainId)) {
    previousArtifact.networks[chainId] = {};
  }

  /** Read deployed contract file to get the contract address**/

  const deployedContractFile = JSON.parse(
    fs.readFileSync(pathToDeployedContractFile).toString("ascii")
  );

  const transactions = deployedContractFile["transactions"];
  if (!transactions) {
    throw new Error(
      `❌ Error when reading transactions in file at: ${pathToContractFile}`
    );
  }

  previousArtifact.networks[chainId].network = networkName;

  for (const transaction of transactions) {
    if (transaction["contractName"] == contractName) {
      previousArtifact.networks[chainId].address =
        transaction["contractAddress"];
    }
  }

  const receipts = deployedContractFile["receipts"];
  if (!receipts) {
    throw new Error(
      `❌ Error when reading receipts in file at: ${pathToContractFile}`
    );
  }

  for (const receipt of receipts) {
    if (
      receipt["contractAddress"] == previousArtifact.networks[chainId].address
    ) {
      previousArtifact.networks[chainId].transactionHash =
        receipt["transactionHash"];
      previousArtifact.networks[chainId].blockNumber = parseInt(
        receipt["blockNumber"]
      );
    }
  }

  currentArtifact.networks = previousArtifact.networks;

  fs.writeFileSync(
    frontContractFilePath,
    JSON.stringify(currentArtifact, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
