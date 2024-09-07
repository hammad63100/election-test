const express = require('express');
const {Web3} = require('web3');
const { abi } = require('./build/contracts/Election.json');

const app = express();
app.use(express.json()); // to parse JSON request bodies

// Connect to your local Ganache blockchain
const web3 = new Web3('http://127.0.0.1:8545');

// Replace this with your deployed contract address
const contractAddress = '0xdadCd6c0CFcB08c274693F2d8feF5AB425D32006';

// Create a contract instance
const electionContract = new web3.eth.Contract(abi, contractAddress);

// Sample route to register a candidate
app.post('/addCandidate', async (req, res) => {
  try {
    const { name, from } = req.body;
    const tx = await electionContract.methods.addCandidate(name).send({ from, value: web3.utils.toWei('1', 'ether') });
    res.status(200).send(tx);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Sample route to vote for a candidate
app.post('/vote', async (req, res) => {
  try {
    const { candidateId, from } = req.body;
    const tx = await electionContract.methods.vote(candidateId).send({ from });
    res.status(200).send(tx);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
