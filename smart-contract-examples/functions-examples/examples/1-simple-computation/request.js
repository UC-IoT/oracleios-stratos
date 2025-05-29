const fs = require("fs");
const { performance } = require('perf_hooks');
const path = require("path");
const ethers = require("ethers");
const {
  SubscriptionManager,
  simulateScript,
  ResponseListener,
  ReturnType,
  decodeResult,
  FulfillmentCode,
} = require("@chainlink/functions-toolkit");
const functionsConsumerAbi = require("../../abi/functionsClient.json");

require("@chainlink/env-enc").config();

const consumerAddress = "0xd2b1c7a775d3efdd9b8d0c6b317674d75de50f81"; // REPLACE this with your Functions consumer address
const subscriptionId = 3088; // REPLACE this with your subscription ID

const whole_start = performance.now();
const makeRequestSepolia = async () => {
  // hardcoded for Ethereum Sepolia
  const routerAddress = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
  const linkTokenAddress = "0x779877a7b0d9e8603169ddbd7836e478b4624789";
  const donId = "fun-ethereum-sepolia-1";
  const explorerUrl = "https://sepolia.etherscan.io";

  // Initialize functions settings
  const source = fs
    .readFileSync(path.resolve(__dirname, "source.js")).toString();

 
  const gasLimit = 300000;

  // Initialize ethers signer and provider to interact with the contracts onchain
  const privateKey = process.env.PRIVATE_KEY; // fetch PRIVATE_KEY
  if (!privateKey)
    throw new Error(
      "private key not provided - check your environment variables"
    );

  const rpcUrl = process.env.ETHEREUM_SEPOLIA_RPC_URL; // fetch Sepolia RPC URL

  if (!rpcUrl)
    throw new Error(`rpcUrl not provided  - check your environment variables`);

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey);
  const signer = await wallet.connect(provider); // create ethers signer for signing transactions
  const args = ["1", "2", "https://api-sepolia.etherscan.io", "provider"];
  ///////// START SIMULATION ////////////

  // console.log("Start simulation...");

  // const response = await simulateScript({
  //   source: source,
  //   args: args,
  //   bytesArgs: [], // bytesArgs - arguments can be encoded off-chain to bytes.
  //   secrets: {}, // no secrets in this example
  // });

  // console.log("Simulation result", response);
  // const errorString = response.errorString;
  // if (errorString) {
  //   console.log(`❌ Error during simulation: `, errorString);
  // } else {
  //   // const returnType = ReturnType.uint256;
  //   const returnType = ReturnType.string;

  //   const responseBytesHexstring = response.responseBytesHexstring;
  //   if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
  //     const decodedResponse = decodeResult(
  //       response.responseBytesHexstring,
  //       returnType
  //     );
  //     console.log(`✅ Decoded response to ${returnType}: `, decodedResponse);
  //   }
  // }

  // //////// ESTIMATE REQUEST COSTS ////////
  // console.log("\nEstimate request costs...");
  // // Initialize and return SubscriptionManager
  // const subscriptionManager = new SubscriptionManager({
  //   signer: signer,
  //   linkTokenAddress: linkTokenAddress,
  //   functionsRouterAddress: routerAddress,
  // });
  // await subscriptionManager.initialize();

  // // estimate costs in Juels

  // const gasPriceWei = await signer.getGasPrice(); // get gasPrice in wei

  // const estimatedCostInJuels =
  //   await subscriptionManager.estimateFunctionsRequestCost({
  //     donId: donId, // ID of the DON to which the Functions request will be sent
  //     subscriptionId: subscriptionId, // Subscription ID
  //     callbackGasLimit: gasLimit, // Total gas used by the consumer contract's callback
  //     gasPriceWei: BigInt(gasPriceWei), // Gas price in gWei
  //   });

  // console.log(
  //   `Fulfillment cost estimated to ${ethers.utils.formatEther(
  //     estimatedCostInJuels
  //   )} LINK`
  // );

  //////// MAKE REQUEST ////////
  console.log("\nMake request...");
  const preperation_start = performance.now();
  const functionsConsumer = new ethers.Contract(
    consumerAddress,
    functionsConsumerAbi,
    signer
  );

  // // Actual transaction call
  
  const transaction = await functionsConsumer.sendRequest(
    source, // source
    "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
    0, // don hosted secrets - slot ID - empty in this example
    0, // don hosted secrets - version - empty in this example
    args,
    [], // bytesArgs - arguments can be encoded off-chain to bytes.
    subscriptionId,
    gasLimit,
    ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
  );

  const preperation_end = performance.now();
  const preperation_time = preperation_end - preperation_start;
  
  const request_start = performance.now();
  // Log transaction details
  console.log(
    `\n✅ Functions request sent! Transaction hash ${transaction.hash}. Waiting for a response...`
    // TODO: Time here
  );

  console.log(
    `See your request in the explorer ${explorerUrl}/tx/${transaction.hash}`
  );
 

  const fulfillment_start = performance.now();
  const responseListener = new ResponseListener({
    provider: provider,
    functionsRouterAddress: routerAddress,
  }); // Instantiate a ResponseListener object to wait for fulfillment.
  (async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        responseListener
          .listenForResponseFromTransaction(transaction.hash)
          .then((response) => {
            resolve(response); // Resolves once the request has been fulfilled.
          })
          .catch((error) => {
            reject(error); // Indicate that an error occurred while waiting for fulfillment.
          });
      });

      const fulfillmentCode = response.fulfillmentCode;

      if (fulfillmentCode === FulfillmentCode.FULFILLED) {
        console.log(
          `\n✅ Request ${
            response.requestId
          } successfully fulfilled. Cost is ${ethers.utils.formatEther(
            response.totalCostInJuels
          )} LINK.Complete reponse: `,
          response
        );
      
      } else if (fulfillmentCode === FulfillmentCode.USER_CALLBACK_ERROR) {
        console.log(
          `\n⚠️ Request ${
            response.requestId
          } fulfilled. However, the consumer contract callback failed. Cost is ${ethers.utils.formatEther(
            response.totalCostInJuels
          )} LINK.Complete reponse: `,
          response
        );
      } else {
        console.log(
          `\n❌ Request ${
            response.requestId
          } not fulfilled. Code: ${fulfillmentCode}. Cost is ${ethers.utils.formatEther(
            response.totalCostInJuels
          )} LINK.Complete reponse: `,
          response
        );
      }
      const fulfillment_end = performance.now();
      const fulfillment_time = fulfillment_end - fulfillment_start
      const request_end = performance.now();
      const request_time = request_end - request_start

      const errorString = response.errorString;
      if (errorString) {
        console.log(`\n❌ Error during the execution: `, errorString);
      } else {
        const responseBytesHexstring = response.responseBytesHexstring;
        if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
          const decodedResponse = decodeResult(
            response.responseBytesHexstring,
            // ReturnType.uint256
            ReturnType.string
          );
          console.log(
            // `\n✅ Decoded response to ${ReturnType.uint256}: `,
            // decodedResponse
            `\n✅ Decoded response to ${ReturnType.string}: `,
            decodedResponse.split('\n')
          );
          requestString = decodedResponse.split('\n')
          const whole_end = performance.now();
          const whole_time = whole_end - whole_start
          console.log(
            `Preparation time: ${preperation_time} \nRequest time: ${request_time} \nFultillment time: ${fulfillment_time} \n${requestString[1]}`,
          );
        }
      }
    } catch (error) {
      console.error("Error listening for response:", error);
    }
  })();
};

makeRequestSepolia().catch((e) => {
  console.error(e);
  process.exit(1);
});
