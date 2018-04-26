const USDTJSON = require('../build/contracts/USDT.json');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

const ContractAddress = USDTJSON.networks['2017'].address;

const USDT = new web3.eth.Contract(USDTJSON.abi, ContractAddress, {
  gasPrice: 1000000000, // 1gwei
  gasLimit: 4000000,
});

async function main() {
  let accounts = await web3.eth.getAccounts();
  if (accounts.length < 2) {
    await web3.eth.personal.newAccount('123456');
    accounts = await web3.eth.getAccounts();
  }

  const account1 = accounts[0];
  const account2 = accounts[1];
  console.log(account1, 'usdt:', await USDT.methods.balanceOf(account1).call({from: account1}));
  console.log(account2, 'usdt:', await USDT.methods.balanceOf(account2).call({from: account2}));

  await web3.eth.personal.unlockAccount(account1, '123456');
  console.log('transfer from account1 to account2 100 usdt');
  await USDT.methods.transfer(account2, 100).send({from: account1});

  console.log(account1, 'usdt:', await USDT.methods.balanceOf(account1).call({from: account1}));
  console.log(account2, 'usdt:', await USDT.methods.balanceOf(account2).call({from: account2}));

};

main().then(() => {
}).catch((e) => {
  console.log("error", e);
});

