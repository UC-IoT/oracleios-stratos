const ethers = await import("npm:ethers@6.10.0");
// const ethers = require("ethers")
// const { performance } = require("node:perf_hooks");
const { performance } = await import("node:perf_hooks");
const start = performance.now();
const smartContractAddress = "0x3537f0323a305a3fd4d73c3b154c83c98760da98";

const pA = ["2138555692880622263271992993065412802024255371420158428134342155143565819216", "5507988280117161444699685498514979439614104138927449834998148193126775762848"];
const pB = [["11215970824523454966403095569815869785309840766904427967394468295310140189088", "3914063248593302971009396090156834665251033550100419179649064845107908907825"],["14463536514907201604210709107347568487943536820728811356577519762679411802105", "18432471065675428656552240833703993023024377393030563706384320998214651410505"]];
const pC = ["9394125898264381103494111732269148788742587119540530351618467368497179935269","16622723891871603588296493474804479670548249522297148014024117492608468919722"];
const pubSignals = ["21888242871839275222246405745257275088548364400416034343698204186575546963528"];
// const provide_v5 = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
// const provider = new ethers.WebSocketProvider("wss://ethereum-sepolia-rpc.publicnode.com");
const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com"
// console.log(provider);
const zkABI = [
	{
		"inputs": [
			{
				"internalType": "uint256[2]",
				"name": "_pA",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256[2][2]",
				"name": "_pB",
				"type": "uint256[2][2]"
			},
			{
				"internalType": "uint256[2]",
				"name": "_pC",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256[1]",
				"name": "_pubSignals",
				"type": "uint256[1]"
			}
		],
		"name": "verifyProof",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
console.log("Calling smart contract...");

class FunctionsJsonRpcProvider extends ethers.JsonRpcProvider {
	constructor(url) {
	  super(url);
	  this.url = url;
	}
	async _send(payload) {
	  let resp = await fetch(this.url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	  });
	  return resp.json();
	}
  }

const provider = new FunctionsJsonRpcProvider(RPC_URL);

const zkAddress = new ethers.Contract(smartContractAddress, zkABI, provider);

const result = await zkAddress.verifyProof(pA, pB, pC, pubSignals);
const end = performance.now();
const time = end - start;
return Functions.encodeString(`Result: ${result}\ncontract time: ${time.toString()}`);



