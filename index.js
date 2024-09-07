require('dotenv').config();
const express = require('express');
const {Web3} = require('web3');

//const { abi } = require('./build/contracts/Election.json'); // Path to ABI
//const { abi } = require('./build/contracts/Election.json');
//console.log(abi);





const app = express();
const port = 3000;

// Connect to blockchain
const web3 = new Web3('http://localhost:7545'); // Ganache RPC URL
const contractAddress = '0xdadCd6c0CFcB08c274693F2d8feF5AB425D32006'; // Deployed contract address
//const electionContract = new web3.eth.Contract(abi, contractAddress);

const electionABI = require('./build/contracts/Election.json').abi;
const electionContract = new web3.eth.Contract(electionABI, contractAddress);

console.log(electionContract.methods);  // Check if addCandidate is listed




// Middleware
app.use(express.json());

// API to get election phase
app.get('/phase', async (req, res) => {
  const phase = await electionContract.methods.currentPhase().call();
  res.send({ phase });
});

// API to add a candidate
// app.post('/addCandidate', async (req, res) => {
//   const { name, from } = req.body; // Candidate name and sender address

//   try {
//     await electionContract.methods.addCandidate(name).send({
//       from: from,
//       value: web3.utils.toWei('1', 'ether'), // Require 1 ether as per your contract
//       gas: '3000000',
//     });
//     res.send({ message: 'Candidate added successfully!' });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });
app.post('/addCandidate', async (req, res) => {
    try {
      const { name, from } = req.body;
      const tx = await electionContract.methods.addCandidate(name).send({ from, value: web3.utils.toWei('1', 'ether') });
      res.status(200).send(tx);
    } catch (error) {
      console.error(error); // Log the actual error
      res.status(500).send({ error: error.message });
    }
  });
  



// API to vote
app.post('/vote', async (req, res) => {
  const { candidateId, from } = req.body;

  try {
    await electionContract.methods.vote(candidateId).send({
      from: from,
      gas: '3000000',
    });
    res.send({ message: 'Vote cast successfully!' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
