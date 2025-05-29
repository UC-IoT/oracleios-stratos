const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
  let adoption;
  let expectedPetId;

  before(async () => {
    adoption = await Adoption.deployed();
    expectedPetId = 8;
  });

  before("adopt a pet using accounts[0]", async () => {
    await adoption.adopt(expectedPetId, { from: accounts[0] });
  });

  it("can fetch the address of an owner by pet id", async () => {
    const adopter = await adoption.adopters(expectedPetId);
    assert.equal(adopter, accounts[0], "The owner of the adopted pet should be the first account.");
  });

  it("can fetch the collection of all pet owners' addresses", async () => {
    const adopters = await adoption.getAdopters();
    assert.equal(adopters[expectedPetId], accounts[0], "The owner of the adopted pet should be in the collection.");
  });
});
