const USDTJSON = require('../build/contracts/USDT.json');
const Web3 = require('web3');
const web3 = new Web3('ws://127.0.0.1:8546');
const ContractAddress = USDTJSON.networks['2017'].address;

const USDT = new web3.eth.Contract(USDTJSON.abi, ContractAddress, {
  gasPrice: 1000000000, // 1gwei
  gasLimit: 4000000,
});

USDT.events.Transfer({
}, function(err, data) {
  console.log(err, data);
});
