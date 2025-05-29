const Web3 = require('web3')

const personName = args[6]
const genderizeUrl = "https://api.genderize.io"
const web3 = new Web3("https://sepolia.infura.io/v3/")
const wallet = "0x4ec77d7AaB8e69c2A8F7CE3d4106415696279478"
const zkAddress = "0x56646df3c5a9e5c70fd2a125f2876c02cf20ffdd"
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
]

// if (
//   secrets.apiKey == "" ||
//   secrets.apiKey === "Your coinmarketcap API key (get a free one: https://coinmarketcap.com/api/)"
// ) {
//   throw Error(
//     "COINMARKETCAP_API_KEY environment variable not set for CoinMarketCap API.  Get a free key from https://coinmarketcap.com/api/"
//   )
// }

// To make an HTTP request, use the Functions.makeHttpRequest function
// Functions.makeHttpRequest function parameters:
// - url
// - method (optional, defaults to 'GET')
// - headers: headers supplied as an object (optional)
// - params: URL query parameters supplied as an object (optional)
// - data: request body supplied as an object (optional)
// - timeout: maximum request duration in ms (optional, defaults to 10000ms)
// - responseType: expected response type (optional, defaults to 'json')

console.log(`Sending HTTP request ${url}\n`)

// Use multiple APIs & aggregate the results to enhance decentralization
// const pokemonReq = Functions.makeHttpRequest({
//   url: `${url}/${pokemonChar}`,
//   method: "GET",
// })

const genderReq = Functions.makeHttpRequest({
  url: url,
  params: {
    name: personName,
  },
  method: "GET",
})

// const coinMarketCapRequest = Functions.makeHttpRequest({
//   url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert=USD&id=${coinMarketCapCoinId}`,
//   // Get a free API key from https://coinmarketcap.com/api/
//   headers: { "X-CMC_PRO_API_KEY": secrets.apiKey },
// })
// const coinGeckoRequest = Functions.makeHttpRequest({
//   url: `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoCoinId}&vs_currencies=usd`,
// })
// const coinPaprikaRequest = Functions.makeHttpRequest({
//   url: `https://api.coinpaprika.com/v1/tickers/${coinPaprikaCoinId}`,
// })
// // This dummy request simulates a failed API request
// const badApiRequest = Functions.makeHttpRequest({
//   url: `https://badapi.com/price/symbol/${badApiCoinId}`,
// })

// First, execute all the API requests are executed concurrently, then wait for the responses
const genderResponse = await genderReq
// const pokemonResponse = await pokemonReq
// const [coinMarketCapResponse, coinGeckoResponse, coinPaprikaResponse, badApiResponse] = await Promise.all([
//   coinMarketCapRequest,
//   coinGeckoRequest,
//   coinPaprikaRequest,
//   badApiRequest,
// ])

// CALLING ZK PROOF CONTRACT HERE //
const pA = ["2138555692880622263271992993065412802024255371420158428134342155143565819216", "5507988280117161444699685498514979439614104138927449834998148193126775762848"]
const pB = [["11215970824523454966403095569815869785309840766904427967394468295310140189088", "3914063248593302971009396090156834665251033550100419179649064845107908907825"],["14463536514907201604210709107347568487943536820728811356577519762679411802105", "18432471065675428656552240833703993023024377393030563706384320998214651410505"]]
const pC = ["9394125898264381103494111732269148788742587119540530351618467368497179935269","16622723891871603588296493474804479670548249522297148014024117492608468919722"]
const pubSignals = ["21888242871839275222246405745257275088548364400416034343698204186575546963528"]
const zkProofContract = new web3.eth.Contract(zkABI, zkAddress)
zkProofContract.methods.verifyProof(response.data).call({wallet}, function(error, result){
	if(!error){
		console.log(result);
	}else{
		console.log(error)
	}
})
// const gas = await tx.estimateGas({from: yourAddress})
// const data = tx.encodeABI()
// const txData = {
//     from: yourAddress,
//     to: zkProofContractAddress,
//     data: data,
//     gas: gas
// }
// web3.eth.sendTransaction(txData)



// const prices = []
if (genderResponse.error) {
  console.log(genderResponse.error)
  throw Error("Request failed")
}
// if (pokemonResponse.error) {
//   console.error(pokemonResponse.error)
//   throw Error("Request failed")
// }
// if (!coinMarketCapResponse.error) {
//   prices.push(coinMarketCapResponse.data.data[coinMarketCapCoinId].quote.USD.price)
// } else {
//   console.log("CoinMarketCap Error")
// }
// if (!coinGeckoResponse.error) {
//   prices.push(coinGeckoResponse.data[coinGeckoCoinId].usd)
// } else {
//   console.log("CoinGecko Error")
// }
// if (!coinPaprikaResponse.error) {
//   prices.push(coinPaprikaResponse.data.quotes.USD.price)
// } else {
//   console.log("CoinPaprika Error")
// }
// // A single failed API request does not cause the whole request to fail
// if (!badApiResponse.error) {
//   prices.push(httpResponses[3].data.price.usd)
// } else {
//   console.log(
//     "Bad API request failed. (This message is expected to demonstrate using console.log for debugging locally with the simulator)"
//   )
// }
// console.log(pokemonResponse)
console.log(genderResponse)
// At least 3 out of 4 prices are needed to aggregate the median price
// if (prices.length < 3) {
//   // If an error is thrown, it will be returned back to the smart contract
//   throw Error("More than 1 API failed")
// }
const reqData = genderResponse.data
// const reqData = genderizeResponse.data

console.log(reqData)
// const medianPrice = prices.sort((a, b) => a - b)[Math.round(prices.length / 2)]
// console.log(`Median Bitcoin price: $${medianPrice.toFixed(2)}`)
// const myData = {
//   base_experience: reqData.base_experience,
//   weight: reqData.weight / 10,
//   height: reqData.height / 10,
// }
// The source code MUST return a Buffer or the request will return an error message
// Use one of the following functions to convert to a Buffer representing the response bytes that are returned to the consumer smart contract:
// - Functions.encodeUint256
// - Functions.encodeInt256
// - Functions.encodeString
// Or return a custom Buffer for a custom byte encoding
// return Functions.encodeUint256(Math.round(medianPrice * 100))
// return Functions.encodeString(JSON.stringify(myData))
return Functions.encodeString(reqData.gender)
