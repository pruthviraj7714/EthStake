// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OrcaCoin is ERC20 {
    address stakingContract;
    mapping(address => uint256) public balances;

    constructor(address _stakingContract) ERC20("Orca", "ORC") {
        stakingContract = _stakingContract;
    }

    function mint(address _account, uint _amount) external {
        require(msg.sender == stakingContract, "Unauthorized");
        _mint(_account,_amount);
    }

    function updateStakingContract(address _newAddress) public {
        require(msg.sender == stakingContract, "Unauthorized");
        stakingContract = _newAddress;
    }

    function balanceOfToken(address _address) view public returns(uint256)  {
        return balances[_address];
    }

}
