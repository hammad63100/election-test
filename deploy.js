require('dotenv').config();
const {Web3} = require('web3');
const { abi, evm } = require('./build/contracts/Election.json'); // Path to compiled contract

// let instance = await Election.deployed();
// await instance.addCandidate('CandidateName', { from: '0x69FC4213Ae0BCaBb2b21f892A5162e7879A343Ee', value: web3.utils.toWei('1', 'ether') });
// const PRIVATE_KEY = '0x70a89c32b0d6ba96899831be985a5a40528721d86362c6bcc29ee42dfbc0f8c7';



const web3 = new Web3('HTTP://127.0.0.1:7545'); // Use Ganache for local deployment
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// const deploy = async () => {
//   const contract = new web3.eth.Contract(abi);

//   const result = await contract
//     .deploy({ data: evm.bytecode.object })
//     .send({ from: account.address, gas: '3000000' });

//   console.log('Contract deployed to:', result.options.address);
// };

// deploy();

const deployContract = async () => {
  const instance = await Election.deployed();
  await instance.addCandidate('CandidateName', {
      from: '0x69FC4213Ae0BCaBb2b21f892A5162e7879A343Ee',
      value: web3.utils.toWei('1', 'ether')
  });
};

deployContract();
