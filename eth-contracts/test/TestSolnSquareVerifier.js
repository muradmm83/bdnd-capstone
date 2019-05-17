const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');

const proofs = require('./proofs');
const index = 1;

contract('SolnSquareVerifier', accounts => {

    describe('Test SolnSquareVerifier', () => {

        beforeEach(async () => {
            const verifierContract = await Verifier.new({
                from: accounts[0]
            });
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {
                from: accounts[0]
            });
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier

        it('Should add a new solution for the contract', async () => {
            const proof = proofs[0].proof;
            const input = proofs[0].input;

            const result = await this.contract.mintNFT.call(
                accounts[1],
                index,
                proof.A,
                proof.A_p,
                proof.B,
                proof.B_p,
                proof.C,
                proof.C_p,
                proof.H,
                proof.K,
                input, {
                    from: accounts[0]
                });

            assert.equal(result, true, 'invalid proof or solution is duplicate');
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Should mint ERC721 token', async () => {
            const result = await this.contract.mint.call(accounts[1], index, 'This is actually added only becuase it is stated in the TODO', {
                from: accounts[0]
            });

            assert.equal(result, true, 'token was not minted');
        });

    });

});