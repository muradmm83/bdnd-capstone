// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
let SquareVerifier = artifacts.require('Verifier');

const proofs = require('./proofs');

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

contract('SquareVerifier', accounts => {

    beforeEach(async () => {
        this.contract = await SquareVerifier.new({
            from: accounts[0]
        });
    });

    it('should verify when using a correct proof', async () => {
        let p = proofs[0].proof;
        let input = proofs[0].input;

        let result = await this.contract.verifyTx.call(p.A, p.A_p, p.B, p.B_p, p.C, p.C_p, p.H, p.K, input);
        assert.equal(result, true, 'Should return true')
    });

    it('should not verify when using an invalid proof', async () => {
        let p = proofs[0].proof;
        let input = [15, 61];

        let result = await this.contract.verifyTx.call(p.A, p.A_p, p.B, p.B_p, p.C, p.C_p, p.H, p.K, input);

        assert.equal(result, false, 'Should return false')
    });

});

// Test verification with incorrect proof