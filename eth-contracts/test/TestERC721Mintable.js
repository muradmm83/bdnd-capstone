var MMMakhashinERC721Token = artifacts.require('MMMakhashinERC721Token');

contract('TestMMMakhashinERC721Token', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const baseTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/';

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await MMMakhashinERC721Token.new({
                from: account_one
            });

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1, baseTokenURI);
            await this.contract.mint(account_two, 2, baseTokenURI);
            await this.contract.mint(account_two, 3, baseTokenURI);
            await this.contract.mint(account_two, 4, baseTokenURI);
        })

        it('should return total supply', async function () {
            let total = await this.contract.totalSupply();
            assert.equal(total, 4, 'Total supply should be 4');
        })

        it('should get token balance', async function () {
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(4, balance.toNumber(), 'Token balance should be 4');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let uri = await this.contract.tokenURI(1);
            assert.equal(uri, `${baseTokenURI}1`, 'Invalid token URI');
        })

        it('should transfer token from one owner to another', async function () {
            await this.contract.transferFrom(account_two, account_one, 1, {
                from: account_two
            });
            assert(await this.contract.ownerOf(1), account_one, 'Token was not transfered');
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await MMMakhashinERC721Token.new({
                from: account_one
            });
        })

        it('should fail when minting when address is not contract owner', async function () {
            let result = false;

            try {
                await this.contract.mint(account_two, 1, baseTokenURI, {
                    from: account_two
                });
            } catch (err) {
                result = true;
            }

            assert.equal(result, true, 'only contract owner can mint new token');
        })

        it('should return contract owner', async function () {
            assert.equal(account_one, await this.contract.owner(), 'owner was not set properly');
        })

    });
})