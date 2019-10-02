// =============================================================================
//                                  Config 
// =============================================================================

// sets up web3.js
if (typeof web3 !== 'undefined')  {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Default account is the first one
web3.eth.defaultAccount = web3.eth.accounts[0];
// Constant we use later
const GENESIS = '0x0000000000000000000000000000000000000000000000000000000000000000';

// This is the ABI for your contract (get it from Remix, in the 'Compile' tab)
// ============================================================
const abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "length",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "areDebtors",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "debtors",
      "outputs": [
        {
          "name": "amt_owed",
          "type": "uint32"
        },
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "debtor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "creditor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint32"
        }
      ],
      "name": "LogAdd_IOU",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_path",
          "type": "address[]"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint32"
        }
      ],
      "name": "LogResolvedCycle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "debtor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "creditor",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint32"
        },
        {
          "indexed": false,
          "name": "sign",
          "type": "bool"
        }
      ],
      "name": "LogAdjustedDebt",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "debtor",
          "type": "address"
        },
        {
          "name": "creditor",
          "type": "address"
        }
      ],
      "name": "lookup",
      "outputs": [
        {
          "name": "ret",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint32"
        },
        {
          "name": "_creditor",
          "type": "address"
        },
        {
          "name": "_path_formed",
          "type": "bool"
        },
        {
          "name": "_path",
          "type": "address[]"
        }
      ],
      "name": "add_IOU",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // FIXME: fill this in with your contract's ABI
// ============================================================
abiDecoder.addABI(abi);
// call abiDecoder.decodeMethod to use this - see 'getAllFunctionCalls' for more

// Reads in the ABI
// var BlockchainSplitwiseContractSpec = web3.eth.contract(abi);

// This is the address of the contract you want to connect to; copy this from Remix
const contractAddress = '0x345cA3e014Aaf5dcA488057592ee47305D9B3e10' // FIXME: fill this in with your contract's address/hash

// var BlockchainSplitwise = BlockchainSplitwiseContractSpec.at(contractAddress)
const BlockchainSplitwise = new web3.eth.contract(abi, contractAddress)
console.log('accessing smart contract data')


// =============================================================================
//                            Functions To Implement 
// =============================================================================

// TODO: Add any helper functions here!


// TODO: Take a node(string) and return its neighbors as an array
// Make use of the mapping in the smart contract
function getNeighbors(node) {
  BlockchainSplitwise.methods.areDebtors(node).call((err,res) => {
    console.log('accessing smart contract data')
    console.log(res)
  })
  return [];
}

// TODO: Return a list of all users (creditors or debtors) in the system
// You can return either:
//   - a list of everyone who has ever sent or received an IOU
// OR
//   - a list of everyone currently owing or being owed money
function getUsers() {
  console.log('test getNeighbors')
  // console.log(getNeighbors(web3.eth.defaultAccount))
  console.log('show test methods')
  console.log(BlockchainSplitwise.methods)
  console.log(BlockchainSplitwise.options.address)
  // Find all calls to add_IOU, obtain sender and arguments
  // getAllFunctionCalls(contractAddress, add_IOU)
  // process and return the addresses from the array of objects
  log('test', 'hello')
  console.log('hello')
  return [];
}

// TODO: Get the total amount owed by the user specified by 'user'
function getTotalOwed(user) {
  // use the blockchain to query the debtors mapping to see the total amount owed
}

// TODO: Get the last time this user has sent or received an IOU, in seconds since Jan. 1, 1970
// Return null if you can't find any activity for the user.
// HINT: Try looking at the way 'getAllFunctionCalls' is written. You can modify it if you'd like.
function getLastActive(user) {
  // use getAllFunctionCalls and the UNIX time converter in src/js/utils.js
}

// TODO: add an IOU ('I owe you') to the system
// The person you owe money is passed as 'creditor'
// The amount you owe them is passed as 'amount'
function add_IOU(creditor, amount) {
  // make a call to doBFS
  // 1st version without the path from doBFS

  var path_formed = false  
  var path = []

  BlockchainSplitwise.methods.add_IOU(
    amount, creditor, path_formed, path
  ).call({from: web3.eth.defaultAccount}, function(error, result){
    console.log('err:', err, 'result:', result)})
  
}

// =============================================================================
//                              Provided Functions 
// =============================================================================
// Reading and understanding these should help you implement the above

// This searches the block history for all calls to 'functionName' (string) on the 'addressOfContract' (string) contract
// It returns an array of objects, one for each call, containing the sender ('from') and arguments ('args')
// https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethblocknumber
function getAllFunctionCalls(addressOfContract, functionName) {
  var curBlock = web3.eth.blockNumber;
  var function_calls = [];
  while (curBlock !== GENESIS) {
    // true flag means transactions are returned as objects
    var b = web3.eth.getBlock(curBlock, true); 
    var txns = b.transactions;
    for (var j = 0; j < txns.length; j++) {
      var txn = txns[j];
      // check that destination of txn is our contract
      if (txn.to === addressOfContract) {
        var func_call = abiDecoder.decodeMethod(txn.input);
        // check that the function getting called in this txn is 'functionName'
        if (func_call && func_call.name === functionName) {
          var args = func_call.params.map(function (x) {return x.value});
          function_calls.push({
            from: txn.from,
            args: args
          })
        }
      }
    }
    curBlock = b.parentHash;
  }
  return function_calls;
}

// We've provided a breadth-first search implementation for you, if that's useful
// It will find a path from start to end (or return null if none exists)
// You just need to pass in a function ('getNeighbors') that takes a node (string) and returns its neighbors (as an array)
function doBFS(start, end, getNeighbors) {
  var queue = [[start]];
  while (queue.length > 0) {
    var cur = queue.shift(); // return the first item and make queue shorter
    var lastNode = cur[cur.length-1]
    if (lastNode === end) {
      return cur;
    } else {
      var neighbors = getNeighbors(lastNode);
      for (var i = 0; i < neighbors.length; i++) {
        // concat joins two arrays
        // push adds the element to the end of the array
        queue.push(cur.concat([neighbors[i]]));
      }
    }
  }
  return null;
}
// =============================================================================
//                                      UI 
// =============================================================================

// This code updates the 'My Account' UI with the results of your functions
// # is to select element with id
$("#total_owed").html("$"+getTotalOwed(web3.eth.defaultAccount));
$("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)));
$("#myaccount").change(function() {
  web3.eth.defaultAccount = $(this).val();
  $("#total_owed").html("$"+getTotalOwed(web3.eth.defaultAccount));
  $("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)))
});

// Allows switching between accounts in 'My Account' and the 'fast-copy' in 'Address of person you owe
// . is to select element with class
var opts = web3.eth.accounts.map(function (a) { return '<option value="'+a+'">'+a+'</option>' })
$(".account").html(opts);
$(".wallet_addresses").html(web3.eth.accounts.map(function (a) { return '<li>'+a+'</li>' }))

// This code updates the 'Users' list in the UI with the results of your function
$("#all_users").html(getUsers().map(function (u,i) { return "<li>"+u+"</li>" }));

// This runs the 'add_IOU' function when you click the button
// It passes the values from the two inputs above
$("#addiou").click(function() {
  add_IOU($("#creditor").val(), $("#amount").val());
  window.location.reload(true); // refreshes the page after
});

// This is a log function, provided if you want to display things to the page instead of the JavaScript console
// Pass in a discription of what you're printing, and then the object to print
function log(description, obj) {
  $("#log").html($("#log").html() + description + ": " + JSON.stringify(obj, null, 2) + "\n\n");
}


// =============================================================================
//                     Basic testing code (refactor later)
// =============================================================================


