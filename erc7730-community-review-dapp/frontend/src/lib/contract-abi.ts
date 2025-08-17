// Auto-generated ABI from Foundry build artifacts
// Generated on: 2025-08-17T01:45:20.562Z
// Contract: ERC7730CommunityReview
// Bytecode Hash: 0.8.19+commit.7dd6d404

export const ERC7730COMMUNITYREVIEW_ABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "contractToSubmission",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "deactivateSubmission",
    "inputs": [
      {
        "name": "submissionId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getReliabilityScore",
    "inputs": [
      {
        "name": "submissionId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSubmission",
    "inputs": [
      {
        "name": "submissionId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ERC7730CommunityReview.MetadataSubmission",
        "components": [
          {
            "name": "submitter",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "contractAddress",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "walrusBlobId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "hypergraphId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "submissionTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "totalReviews",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "positiveReviews",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "negativeReviews",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSubmissionByContract",
    "inputs": [
      {
        "name": "contractAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSubmissionReviews",
    "inputs": [
      {
        "name": "submissionId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "reviewIds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "reviewData",
        "type": "tuple[]",
        "internalType": "struct ERC7730CommunityReview.Review[]",
        "components": [
          {
            "name": "reviewer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "isApproved",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "comment",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "reviewTime",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalReviews",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalSubmissions",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserSubmissions",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasReviewed",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "reviews",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "reviewer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "comment",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "reviewTime",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "submissions",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "submitter",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "contractAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "walrusBlobId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "hypergraphId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "submissionTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "isActive",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "totalReviews",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "positiveReviews",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "negativeReviews",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "submitMetadata",
    "inputs": [
      {
        "name": "contractAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "walrusBlobId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "hypergraphId",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "submitReview",
    "inputs": [
      {
        "name": "submissionId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "comment",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "userSubmissions",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "MetadataSubmitted",
    "inputs": [
      {
        "name": "submissionId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "submitter",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "contractAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "walrusBlobId",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "hypergraphId",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ReviewSubmitted",
    "inputs": [
      {
        "name": "submissionId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "reviewId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "reviewer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "isApproved",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "comment",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SubmissionDeactivated",
    "inputs": [
      {
        "name": "submissionId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "submitter",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  }
] as const;

// Export the contract name for convenience
export const CONTRACT_NAME = 'ERC7730CommunityReview' as const;

// Contract bytecode (for deployment)
export const CONTRACT_BYTECODE = '0x60806040526000600155600060025534801561001a57600080fd5b5061002433610029565b610079565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b611c09806100886000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80638da5cb5b116100a2578063a7b8614d11610071578063a7b8614d14610276578063ad73349e14610296578063daffefb3146102be578063df040839146102d1578063f2fde38b146102f157600080fd5b80638da5cb5b146102125780638e8e88fd1461022d5780639b7e018014610240578063a7264f881461025357600080fd5b80633e8686cc116100e95780633e8686cc146101ae57806354554d46146101ce5780636079ef5c146101d6578063715018a6146101e95780638311879c146101f157600080fd5b806325f600821461011b578063309578ff14610132578063314c07b21461017057806334ae892614610199575b600080fd5b6002545b6040519081526020015b60405180910390f35b6101606101403660046114dd565b600760209081526000928352604080842090915290825290205460ff1681565b6040519015158152602001610129565b61011f61017e366004611507565b6001600160a01b031660009081526006602052604090205490565b6101ac6101a7366004611522565b610304565b005b6101c16101bc366004611522565b610465565b6040516101299190611581565b60015461011f565b6101ac6101e43660046116e1565b610668565b6101ac610966565b6102046101ff366004611522565b61097a565b604051610129929190611790565b6000546040516001600160a01b039091168152602001610129565b61011f61023b366004611522565b610c18565b61011f61024e3660046114dd565b610dee565b610266610261366004611839565b610e1f565b604051610129949392919061185b565b610289610284366004611507565b610eeb565b6040516101299190611898565b6102a96102a4366004611522565b610f57565b604051610129999897969594939291906118ab565b6101ac6102cc36600461191a565b6110c0565b61011f6102df366004611507565b60066020526000908152604090205481565b6101ac6102ff366004611507565b61139e565b60008181526003602052604090205481906001600160a01b03166103435760405162461bcd60e51b815260040161033a9061196e565b60405180910390fd5b6000828152600360205260409020546001600160a01b031633146103a95760405162461bcd60e51b815260206004820152601d60248201527f4f6e6c79207375626d69747465722063616e2064656163746976617465000000604482015260640161033a565b60008281526003602052604090206005015460ff1661040a5760405162461bcd60e51b815260206004820152601e60248201527f5375626d697373696f6e20616c72656164792064656163746976617465640000604482015260640161033a565b60008281526003602052604090819020600501805460ff1916905551339083907fef0c33cef24dd92a2c5523ce8b8bb8c7383755f1be02eb82050539c9283474fa906104599042815260200190565b60405180910390a35050565b6104c860405180610120016040528060006001600160a01b0316815260200160006001600160a01b031681526020016060815260200160608152602001600081526020016000151581526020016000815260200160008152602001600081525090565b60008281526003602090815260409182902082516101208101845281546001600160a01b039081168252600183015416928101929092526002810180549293919291840191610516906119a5565b80601f0160208091040260200160405190810160405280929190818152602001828054610542906119a5565b801561058f5780601f106105645761010080835404028352916020019161058f565b820191906000526020600020905b81548152906001019060200180831161057257829003601f168201915b505050505081526020016003820180546105a8906119a5565b80601f01602080910402602001604051908101604052809291908181526020018280546105d4906119a5565b80156106215780601f106105f657610100808354040283529160200191610621565b820191906000526020600020905b81548152906001019060200180831161060457829003601f168201915b505050918352505060048201546020820152600582015460ff1615156040820152600682015460608201526007820154608082015260089091015460a09091015292915050565b6001600160a01b0383166106be5760405162461bcd60e51b815260206004820152601f60248201527f436f6e747261637420616464726573732063616e6e6f74206265207a65726f00604482015260640161033a565b600082511161070f5760405162461bcd60e51b815260206004820152601e60248201527f57616c72757320626c6f622049442063616e6e6f7420626520656d7074790000604482015260640161033a565b60008151116107605760405162461bcd60e51b815260206004820152601d60248201527f487970657267726170682049442063616e6e6f7420626520656d707479000000604482015260640161033a565b6001600160a01b038316600090815260066020526040902054156107d15760405162461bcd60e51b815260206004820152602260248201527f436f6e7472616374206164647265737320616c7265616479207375626d697474604482015261195960f21b606482015260840161033a565b600180549060006107e1836119f5565b90915550506001805460408051610120810182523381526001600160a01b0387811660208084019182528385018981526060850189905242608086015260a08501889052600060c0860181905260e0860181905261010086018190528781526003909252949020835181549084166001600160a01b031991821617825591519681018054979093169690911695909517905590519192909160028201906108889082611a5d565b506060820151600382019061089d9082611a5d565b506080820151600482015560a08201516005808301805460ff19169215159290921790915560c083015160068084019190915560e0840151600784015561010090930151600890920191909155336000818152602092835260408082208054600181018255908352848320018690556001600160a01b03891680835294909352829020849055905183907fafca322bf21069eb467951dc655ceed7a608ee548cbc2b3d4fb266e30e740b3d9061095890889088904290611b1d565b60405180910390a450505050565b61096e611417565b6109786000611471565b565b60008181526003602052604090205460609081906001600160a01b03166109b35760405162461bcd60e51b815260040161033a9061196e565b6000838152600360205260409020600601548067ffffffffffffffff8111156109de576109de61163e565b604051908082528060200260200182016040528015610a07578160200160208202803683370190505b5092508067ffffffffffffffff811115610a2357610a2361163e565b604051908082528060200260200182016040528015610a8a57816020015b610a77604051806080016040528060006001600160a01b0316815260200160001515815260200160608152602001600081525090565b815260200190600190039081610a415790505b509150600060015b6002548111158015610aa357508282105b15610c105760008681526004602090815260408083208484529091529020546001600160a01b031615610bfe5780858381518110610ae357610ae3611b53565b6020908102919091018101919091526000878152600482526040808220848352835290819020815160808101835281546001600160a01b0381168252600160a01b900460ff161515938101939093526001810180549192840191610b46906119a5565b80601f0160208091040260200160405190810160405280929190818152602001828054610b72906119a5565b8015610bbf5780601f10610b9457610100808354040283529160200191610bbf565b820191906000526020600020905b815481529060010190602001808311610ba257829003601f168201915b50505050508152602001600282015481525050848381518110610be457610be4611b53565b60200260200101819052508180610bfa906119f5565b9250505b80610c08816119f5565b915050610a92565b505050915091565b600081815260036020908152604080832081516101208101835281546001600160a01b0390811682526001830154169381019390935260028101805485949384019190610c64906119a5565b80601f0160208091040260200160405190810160405280929190818152602001828054610c90906119a5565b8015610cdd5780601f10610cb257610100808354040283529160200191610cdd565b820191906000526020600020905b815481529060010190602001808311610cc057829003601f168201915b50505050508152602001600382018054610cf6906119a5565b80601f0160208091040260200160405190810160405280929190818152602001828054610d22906119a5565b8015610d6f5780601f10610d4457610100808354040283529160200191610d6f565b820191906000526020600020905b815481529060010190602001808311610d5257829003601f168201915b505050918352505060048201546020820152600582015460ff1615156040820152600682015460608201526007820154608082015260089091015460a09091015260c0810151909150600003610dc85750600092915050565b60c081015160e0820151610ddd906064611b69565b610de79190611b86565b9392505050565b60056020528160005260406000208181548110610e0a57600080fd5b90600052602060002001600091509150505481565b6004602090815260009283526040808420909152908252902080546001820180546001600160a01b03831693600160a01b90930460ff16929190610e62906119a5565b80601f0160208091040260200160405190810160405280929190818152602001828054610e8e906119a5565b8015610edb5780601f10610eb057610100808354040283529160200191610edb565b820191906000526020600020905b815481529060010190602001808311610ebe57829003601f168201915b5050505050908060020154905084565b6001600160a01b038116600090815260056020908152604091829020805483518184028101840190945280845260609392830182828015610f4b57602002820191906000526020600020905b815481526020019060010190808311610f37575b50505050509050919050565b6003602052600090815260409020805460018201546002830180546001600160a01b03938416949290931692610f8c906119a5565b80601f0160208091040260200160405190810160405280929190818152602001828054610fb8906119a5565b80156110055780601f10610fda57610100808354040283529160200191611005565b820191906000526020600020905b815481529060010190602001808311610fe857829003601f168201915b50505050509080600301805461101a906119a5565b80601f0160208091040260200160405190810160405280929190818152602001828054611046906119a5565b80156110935780601f1061106857610100808354040283529160200191611093565b820191906000526020600020905b81548152906001019060200180831161107657829003601f168201915b50505060048401546005850154600686015460078701546008909701549596929560ff9092169450925089565b60008381526003602052604090205483906001600160a01b03166110f65760405162461bcd60e51b815260040161033a9061196e565b600084815260036020526040902060050154849060ff166111595760405162461bcd60e51b815260206004820152601860248201527f5375626d697373696f6e206973206e6f74206163746976650000000000000000604482015260640161033a565b336000908152600760209081526040808320888452909152902054859060ff16156111c65760405162461bcd60e51b815260206004820181905260248201527f416c72656164792072657669657765642074686973207375626d697373696f6e604482015260640161033a565b6000868152600360205260409020548690336001600160a01b03909116036112305760405162461bcd60e51b815260206004820152601c60248201527f43616e6e6f7420726576696577206f776e207375626d697373696f6e00000000604482015260640161033a565b60028054906000611240836119f5565b90915550506002546040805160808101825233815288151560208083019182528284018a815242606085015260008d8152600483528581208782529092529390208251815492511515600160a01b026001600160a81b03199093166001600160a01b039190911617919091178155915190919060018201906112c29082611a5d565b50606091909101516002909101553360009081526007602090815260408083208b84528252808320805460ff1916600117905560039091528120600681018054919261130d836119f5565b919050555087156113345760078101805490600061132a836119f5565b919050555061134c565b600881018054906000611346836119f5565b91905055505b336001600160a01b0316828a7f1b6a91ec071bd7bfcc5d49c20cf11d7fbe8a508ac7b622246b0ce52bde06e2818b8b4260405161138b93929190611ba8565b60405180910390a4505050505050505050565b6113a6611417565b6001600160a01b03811661140b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161033a565b61141481611471565b50565b6000546001600160a01b031633146109785760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161033a565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b03811681146114d857600080fd5b919050565b600080604083850312156114f057600080fd5b6114f9836114c1565b946020939093013593505050565b60006020828403121561151957600080fd5b610de7826114c1565b60006020828403121561153457600080fd5b5035919050565b6000815180845260005b8181101561156157602081850181015186830182015201611545565b506000602082860101526020601f19601f83011685010191505092915050565b6020815261159b6020820183516001600160a01b03169052565b600060208301516115b760408401826001600160a01b03169052565b5060408301516101208060608501526115d461014085018361153b565b91506060850151601f198584030160808601526115f1838261153b565b925050608085015160a085015260a085015161161160c086018215159052565b5060c085015160e085015260e0850151610100818187015280870151838701525050508091505092915050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261166557600080fd5b813567ffffffffffffffff808211156116805761168061163e565b604051601f8301601f19908116603f011681019082821181831017156116a8576116a861163e565b816040528381528660208588010111156116c157600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000606084860312156116f657600080fd5b6116ff846114c1565b9250602084013567ffffffffffffffff8082111561171c57600080fd5b61172887838801611654565b9350604086013591508082111561173e57600080fd5b5061174b86828701611654565b9150509250925092565b600081518084526020808501945080840160005b8381101561178557815187529582019590820190600101611769565b509495945050505050565b600060408083526117a381840186611755565b6020848203818601528186518084528284019150828160051b85010183890160005b8381101561182957868303601f19018552815180516001600160a01b03168452868101511515878501528881015160808a8601819052906118088287018261153b565b606093840151969093019590955250948601949250908501906001016117c5565b50909a9950505050505050505050565b6000806040838503121561184c57600080fd5b50508035926020909101359150565b6001600160a01b038516815283151560208201526080604082018190526000906118879083018561153b565b905082606083015295945050505050565b602081526000610de76020830184611755565b6001600160a01b038a8116825289166020820152610120604082018190526000906118d88382018b61153b565b905082810360608401526118ec818a61153b565b6080840198909852505093151560a085015260c084019290925260e083015261010090910152949350505050565b60008060006060848603121561192f57600080fd5b833592506020840135801515811461194657600080fd5b9150604084013567ffffffffffffffff81111561196257600080fd5b61174b86828701611654565b60208082526019908201527f5375626d697373696f6e20646f6573206e6f7420657869737400000000000000604082015260600190565b600181811c908216806119b957607f821691505b6020821081036119d957634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600060018201611a0757611a076119df565b5060010190565b601f821115611a5857600081815260208120601f850160051c81016020861015611a355750805b601f850160051c820191505b81811015611a5457828155600101611a41565b5050505b505050565b815167ffffffffffffffff811115611a7757611a7761163e565b611a8b81611a8584546119a5565b84611a0e565b602080601f831160018114611ac05760008415611aa85750858301515b600019600386901b1c1916600185901b178555611a54565b600085815260208120601f198616915b82811015611aef57888601518255948401946001909101908401611ad0565b5085821015611b0d5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b606081526000611b30606083018661153b565b8281036020840152611b42818661153b565b915050826040830152949350505050565b634e487b7160e01b600052603260045260246000fd5b8082028115828204841417611b8057611b806119df565b92915050565b600082611ba357634e487b7160e01b600052601260045260246000fd5b500490565b8315158152606060208201526000611bc3606083018561153b565b905082604083015294935050505056fea2646970667358221220b3a9c6f4404d6542f2a9be5947f8a8a3dbf03316a3747bfe3bc61b5f00700fc164736f6c63430008130033' as const;

// Contract metadata
export const CONTRACT_METADATA = {
  "compiler": {
    "version": "0.8.19+commit.7dd6d404"
  },
  "language": "Solidity",
  "output": {
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "submissionId",
            "type": "uint256",
            "indexed": true
          },
          {
            "internalType": "address",
            "name": "submitter",
            "type": "address",
            "indexed": true
          },
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address",
            "indexed": true
          },
          {
            "internalType": "string",
            "name": "walrusBlobId",
            "type": "string",
            "indexed": false
          },
          {
            "internalType": "string",
            "name": "hypergraphId",
            "type": "string",
            "indexed": false
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256",
            "indexed": false
          }
        ],
        "type": "event",
        "name": "MetadataSubmitted",
        "anonymous": false
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "previousOwner",
            "type": "address",
            "indexed": true
          },
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address",
            "indexed": true
          }
        ],
        "type": "event",
        "name": "OwnershipTransferred",
        "anonymous": false
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "submissionId",
            "type": "uint256",
            "indexed": true
          },
          {
            "internalType": "uint256",
            "name": "reviewId",
            "type": "uint256",
            "indexed": true
          },
          {
            "internalType": "address",
            "name": "reviewer",
            "type": "address",
            "indexed": true
          },
          {
            "internalType": "bool",
            "name": "isApproved",
            "type": "bool",
            "indexed": false
          },
          {
            "internalType": "string",
            "name": "comment",
            "type": "string",
            "indexed": false
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256",
            "indexed": false
          }
        ],
        "type": "event",
        "name": "ReviewSubmitted",
        "anonymous": false
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "submissionId",
            "type": "uint256",
            "indexed": true
          },
          {
            "internalType": "address",
            "name": "submitter",
            "type": "address",
            "indexed": true
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256",
            "indexed": false
          }
        ],
        "type": "event",
        "name": "SubmissionDeactivated",
        "anonymous": false
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "contractToSubmission",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "submissionId",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "deactivateSubmission"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "submissionId",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getReliabilityScore",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "submissionId",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getSubmission",
        "outputs": [
          {
            "internalType": "struct ERC7730CommunityReview.MetadataSubmission",
            "name": "",
            "type": "tuple",
            "components": [
              {
                "internalType": "address",
                "name": "submitter",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "walrusBlobId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "hypergraphId",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "submissionTime",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "totalReviews",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "positiveReviews",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "negativeReviews",
                "type": "uint256"
              }
            ]
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getSubmissionByContract",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "submissionId",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getSubmissionReviews",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "reviewIds",
            "type": "uint256[]"
          },
          {
            "internalType": "struct ERC7730CommunityReview.Review[]",
            "name": "reviewData",
            "type": "tuple[]",
            "components": [
              {
                "internalType": "address",
                "name": "reviewer",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "isApproved",
                "type": "bool"
              },
              {
                "internalType": "string",
                "name": "comment",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "reviewTime",
                "type": "uint256"
              }
            ]
          }
        ]
      },
      {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "getTotalReviews",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ]
      },
      {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "getTotalSubmissions",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getUserSubmissions",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "hasReviewed",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ]
      },
      {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ]
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "renounceOwnership"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "reviews",
        "outputs": [
          {
            "internalType": "address",
            "name": "reviewer",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isApproved",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "comment",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "reviewTime",
            "type": "uint256"
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "submissions",
        "outputs": [
          {
            "internalType": "address",
            "name": "submitter",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "walrusBlobId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hypergraphId",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "submissionTime",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "totalReviews",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "positiveReviews",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "negativeReviews",
            "type": "uint256"
          }
        ]
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "walrusBlobId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hypergraphId",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "submitMetadata"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "submissionId",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isApproved",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "comment",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "submitReview"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "transferOwnership"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "userSubmissions",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ]
      }
    ],
    "devdoc": {
      "kind": "dev",
      "methods": {
        "deactivateSubmission(uint256)": {
          "details": "Deactivate a submission (only submitter can do this)",
          "params": {
            "submissionId": "The ID of the submission to deactivate"
          }
        },
        "getReliabilityScore(uint256)": {
          "details": "Get submission reliability score (0-100)",
          "params": {
            "submissionId": "The submission ID"
          },
          "returns": {
            "_0": "score The reliability score (0-100)"
          }
        },
        "getSubmission(uint256)": {
          "details": "Get submission details by ID",
          "params": {
            "submissionId": "The submission ID"
          },
          "returns": {
            "_0": "submission The metadata submission"
          }
        },
        "getSubmissionByContract(address)": {
          "details": "Get submission ID by contract address (changed from contract ID)",
          "params": {
            "contractAddress": "The contract address"
          },
          "returns": {
            "_0": "submissionId The submission ID (0 if not found)"
          }
        },
        "getSubmissionReviews(uint256)": {
          "details": "Get all reviews for a submission",
          "params": {
            "submissionId": "The submission ID"
          },
          "returns": {
            "reviewData": "Array of review data",
            "reviewIds": "Array of review IDs"
          }
        },
        "getTotalReviews()": {
          "details": "Get total review count",
          "returns": {
            "_0": "Total number of reviews"
          }
        },
        "getTotalSubmissions()": {
          "details": "Get total submission count",
          "returns": {
            "_0": "Total number of submissions"
          }
        },
        "getUserSubmissions(address)": {
          "details": "Get user submissions",
          "params": {
            "user": "The user address"
          },
          "returns": {
            "_0": "Array of submission IDs"
          }
        },
        "owner()": {
          "details": "Returns the address of the current owner."
        },
        "renounceOwnership()": {
          "details": "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner."
        },
        "submitMetadata(address,string,string)": {
          "details": "Submit metadata for community review",
          "params": {
            "contractAddress": "The contract address (changed from contractId)",
            "hypergraphId": "The Hypergraph identifier for metadata knowledge graph",
            "walrusBlobId": "The Walrus blob identifier for metadata JSON"
          }
        },
        "submitReview(uint256,bool,string)": {
          "details": "Submit a review for a metadata submission",
          "params": {
            "comment": "Optional comment explaining the decision",
            "isApproved": "Whether the metadata is approved or rejected",
            "submissionId": "The ID of the submission to review"
          }
        },
        "transferOwnership(address)": {
          "details": "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
        }
      },
      "version": 1
    },
    "userdoc": {
      "kind": "user",
      "methods": {},
      "version": 1
    }
  },
  "settings": {
    "remappings": [
      "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
      "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
      "forge-std/=lib/forge-std/src/",
      "openzeppelin-contracts/=lib/openzeppelin-contracts/",
      "openzeppelin/=lib/openzeppelin-contracts/contracts/"
    ],
    "optimizer": {
      "enabled": true,
      "runs": 200
    },
    "metadata": {
      "bytecodeHash": "ipfs"
    },
    "compilationTarget": {
      "src/ERC7730CommunityReview.sol": "ERC7730CommunityReview"
    },
    "evmVersion": "paris",
    "libraries": {}
  },
  "sources": {
    "lib/openzeppelin-contracts/contracts/access/Ownable.sol": {
      "keccak256": "0xba43b97fba0d32eb4254f6a5a297b39a19a247082a02d6e69349e071e2946218",
      "urls": [
        "bzz-raw://fc980984badf3984b6303b377711220e067722bbd6a135b24669ff5069ef9f32",
        "dweb:/ipfs/QmPHXMSXj99XjSVM21YsY6aNtLLjLVXDbyN76J5HQYvvrz"
      ],
      "license": "MIT"
    },
    "lib/openzeppelin-contracts/contracts/utils/Context.sol": {
      "keccak256": "0xe2e337e6dde9ef6b680e07338c493ebea1b5fd09b43424112868e9cc1706bca7",
      "urls": [
        "bzz-raw://6df0ddf21ce9f58271bdfaa85cde98b200ef242a05a3f85c2bc10a8294800a92",
        "dweb:/ipfs/QmRK2Y5Yc6BK7tGKkgsgn3aJEQGi5aakeSPZvS65PV8Xp3"
      ],
      "license": "MIT"
    },
    "src/ERC7730CommunityReview.sol": {
      "keccak256": "0x26e8601c8427941b1cb4c295453894d16a5ea1881c80d5339687cfb4a5c8242b",
      "urls": [
        "bzz-raw://ee3f6c801d9e3eb6c6f08b4210a850be4e165ef165f8c9dd056bd02c89dbff10",
        "dweb:/ipfs/QmWr16p7pizbYp6n1fLHLYNsbeDzgcXdT95THphFLkGeKh"
      ],
      "license": "MIT"
    }
  },
  "version": 1
} as const;
