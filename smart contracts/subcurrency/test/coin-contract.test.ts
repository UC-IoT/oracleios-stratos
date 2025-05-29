const Coin = artifacts.require("Coin");

contract("Coin", (accounts) => {
  let coinInstance;
  const minter = accounts[0];
  const receiver = accounts[1];

  before(async () => {
    coinInstance = await Coin.new({ from: minter });
  });

  it("should set the minter as the contract creator", async () => {
    const contractMinter = await coinInstance.minter();
    assert.equal(
      contractMinter,
      minter,
      "The minter should be contract creator."
    );
  });

  it("should mint a coin by minter and send to a receiver.", async () => {
    const mintAmount = 100;
    await coinInstance.mint(receiver, mintAmount, { from: minter });
    const receivedBalance = await coinInstance.balances(receiver);
    assert.equal(
      receivedBalance,
      mintAmount,
      "The receiver balance should be updated after minting."
    );
  });

  it("should prevent non contract creator to mint", async () => {
    const mintAmount = 12;
    const nonMinter = accounts[3];
    try {
      await coinInstance.mint(receiver, mintAmount, { from: nonMinter });
      assert.error("Expected an error but minting is allowed.");
    } catch (error) {
      assert(error.message.includes("revert"), "Unexpected error message");
    }
  });

  it("should be able to send coin from one to another", async () => {
    const newReceiver = accounts[5];
    const sender = accounts[3];

    const amountSend = 20;
    const amountMint = 100;
    await coinInstance.mint(sender, amountMint, { from: minter });
    const initialSenderBalance = await coinInstance.balances(sender);
    const initialReceiverBalance = await coinInstance.balances(newReceiver);

    await coinInstance.send(newReceiver, amountSend, { from: sender });

    const updatedSenderBalance = await coinInstance.balances(sender);
    const updatedReceiverBalance = await coinInstance.balances(newReceiver);

    assert.equal(
      updatedSenderBalance.toNumber(),
      initialSenderBalance.toNumber() - amountSend,
      "The senter updated balance is equal to initial balance minus amount sent."
    );

    assert.equal(
      updatedReceiverBalance.toNumber(),
      initialReceiverBalance.toNumber() + amountSend,
      "The receiver updated balance is equal to initial balance plus amount received, but expected "
    );
  });

  it("should prevent user from sending coins if insufficient", async () => {
    const sender = accounts[3];
    const newReceiver = accounts[5];
    try {
      await coinInstance.send(sender, 500, { from: newReceiver });
      assert.error("Expected an error but transaction allowed.");
    } catch (error) {
      assert(error.message.includes("revert"), "Unexpoected error message");
    }
  });
});
