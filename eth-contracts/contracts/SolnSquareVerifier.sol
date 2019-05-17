pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

import "./Verifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is MMMakhashinERC721Token {
    Verifier private _verifier;

    constructor(address verifierAddress) public {
        _verifier = Verifier(verifierAddress);
    }


    // TODO define a solutions struct that can hold an index & an address

    struct Solution {
        uint256 index;
        address _address;
    }


    // TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => Solution) private _solutions;


    // TODO Create an event to emit when a solution is added
    event SolutionAdded(string desc);


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 indexHash, uint256 index, address _address) internal {
        _solutions[indexHash] = Solution(index, _address);
        emit SolutionAdded("New solution has been added");
    }



    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly

    function mintNFT(
        address _address,
        uint256 index,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input
    ) public returns(bool) {

        bytes32 indexHash = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));

        require(_solutions[indexHash]._address == address(0), "Solution is already exist");

        require(_verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Invalid solution");

        addSolution(indexHash, index, _address);

        return super.mint(_address, index, "actually this is never being used - it is there on the TODO");
    }
}

























