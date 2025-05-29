pragma solidity >=0.4.22 <0.9.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract FastAPI is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    // Chainlink variables
    address private oracle;
    bytes32 private jobId;

    // Event to capture the API response
    event APIResponse(uint256 result);

    // Constructor
    constructor() {
        // Set the oracle address and Job ID for your specific Chainlink job
        oracle = 0x12F2d6b0783127C62956FfF73F4D7f701433b6f5; // Replace with the actual oracle address
        jobId = "19ae68848dfc4f3e9ef237e9f95b2e44";
        // jobId = "19ae68848dfc4f3e9ef237e9f95b2e44"; // Replace with the actual Job ID
    }

    // Function to request data from Chainlink external adapter
    function requestDataFromChainlink(string memory apiURL) public {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        req.add("get", apiURL);
        req.add("path", "result"); // Path to the result in the API response JSON
        sendChainlinkRequestTo(oracle, req, 0); // Setting fee to 0 for Development mode
    }

    // Callback function called by Chainlink Oracle with the response
    function fulfill(
        bytes32 requestId,
        uint256 result
    ) public recordChainlinkFulfillment(requestId) {
        // Process the API response here
        emit APIResponse(result);
    }
}
