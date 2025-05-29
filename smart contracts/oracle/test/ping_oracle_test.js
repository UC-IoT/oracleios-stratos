const Summon = artifacts.require("Summon");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Summon", function (accounts) {
  before(async () => {
    chainlink = await Summon.new(accounts[0]);
    sample = "Hello Oracle";
  });

  it("should receive data from Chainlink Oracle", async function () {
    await chainlink.receiveData(sample);

    const receivedData = await chainlink.receivedData();

    assert.equal(receivedData, sample, "Received data is not as expected");
  });

  it("should response with 'Hello there'", async function () {
    const response = await chainlink.respondData(sample);
    assert.equal(response, "Hello there", "Responsded data is not as expected");
  });

  it("should response with empty string", async function () {
    const response = await chainlink.respondData("Hello there");
    assert.equal(response, "", "Responsded data is not as expected");
  });
});
