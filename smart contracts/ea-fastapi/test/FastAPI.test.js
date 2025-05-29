const { expect } = require("chai");
const FastAPI = artifacts.require("FastAPI");

describe("FastAPI", () => {
  let fastAPI;

  beforeEach(async () => {
    // Deploy FastAPI contract before each test
    fastAPI = await FastAPI.deployed();
  });

  it("should request data from Chainlink and receive a response", async () => {
    // Replace with the actual Chainlink Oracle address and Job ID used in the contract
    const apiURL = "http://127.0.0.1:8000/endpoint"; // Replace with the actual API URL to be tested

    // Request data from Chainlink
    await fastAPI.requestDataFromChainlink(apiURL);

    // Wait for the Chainlink response event
    const apiResponseEvent = await fastAPI.queryFilter(
      fastAPI.filters.APIResponse(null)
    );
    expect(apiResponseEvent).to.have.lengthOf(1);

    // Retrieve the API response from the event
    const apiResponse = apiResponseEvent[0].args.result;
    expect(apiResponse).to.be.a("number"); // Ensure that the response is of the expected data type
  });
});
