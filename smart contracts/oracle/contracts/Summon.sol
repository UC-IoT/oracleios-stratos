pragma solidity >=0.4.22 <0.9.0;

contract Summon {
    address public oracleAddress;
    string public receivedData;

    constructor(address _oracleAddress) {
        oracleAddress = _oracleAddress;
    }

    function receiveData(string memory data) public {
        require(
            msg.sender == oracleAddress,
            "Only the Oracle can call this function"
        );
        receivedData = data;
    }

    function respondData(
        string calldata data
    ) public pure returns (string memory) {
        if (keccak256(bytes(data)) == keccak256(bytes("Hello Oracle"))) {
            return "Hello there";
        } else {
            return "";
        }
    }
}
