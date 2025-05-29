// This example shows how to make a decentralized price feed using multiple APIs

const personName = args[6]
const genderizeUrl = "https://api.genderize.io"


console.log(`Sending HTTP request ${genderizeUrl}\n`)


const genderizeReq = Functions.makeHttpRequest({
  url: genderizeUrl,
  params: {
    name: personName,
  },
  method: "GET",
})

const genderizeResponse = await genderizeReq

if (genderizeResponse.error) {
  console.log(genderizeResponse.error)
  throw Error("Request failed")
}
console.log(genderizeResponse)
const reqData = genderizeResponse.data

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
