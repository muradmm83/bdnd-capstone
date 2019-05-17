const web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");

const config = require('./deployment-config');
const proofs = require('./eth-contracts/test/proofs');
const abi = require('./eth-contracts/build/contracts/SolnSquareVerifier').abi;

const MNEMONIC = config.mnemonic;
const INFURA_KEY = config.projectId;
const NFT_CONTRACT_ADDRESS = config.solnSquaqreVerifierAddress;
const NETWORK = 'rinkeby';

if (!MNEMONIC || !INFURA_KEY || !config.ownerAddress || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}


async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS) {

        const nftContract = new web3Instance.eth.Contract(abi, NFT_CONTRACT_ADDRESS, {
            from: config.ownerAddress,
            gasLimit: "1000000"
        });


        for (var i = 0; i < 5; i++) {
            let proof = proofs[i].proof;
            let input = proofs[i].input;

            try {
                console.log('Minting token ...');

                const result = await nftContract.methods.mintNFT(
                        config.account3,
                        i + 1,
                        proof.A,
                        proof.A_p,
                        proof.B,
                        proof.B_p,
                        proof.C,
                        proof.C_p,
                        proof.H,
                        proof.K,
                        input
                    )
                    .send({
                        from: config.ownerAddress,
                        gas: 5510328
                    });

                console.log('New token has been minted: ' + result.transactionHash);
            } catch (err) {
                console.log('Error minting token: ' + err);
            }
        }
    }
}

main();