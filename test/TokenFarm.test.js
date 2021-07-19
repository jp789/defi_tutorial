const { assert } = require('chai')

const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

const Web3 = require('web3')
const web3 = new Web3("http://localhost:7545");

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n){
  return web3.utils.toWei(n, 'ether')
}

contract('TokenFarm', (accounts) => {
  
  let daiToken, dappToken, tokenFarm
  
  before(async() => {
    // Load Contracts
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

    // Transfer all Dapp tokens to farm (1 million ... pinky to mouth)
    await dappToken.transfer(tokenFarm.address, tokens('1000000'))

    // TODO continue ~58min i.e. sending token to investors    
  })

  describe('Mock Dai deployment', async() => {
    it('has a name', async() => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })
})