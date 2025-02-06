// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ItokenAddress {
    function mint(address _account, uint _amount) external;
}

contract StakingContract {
    mapping(address => uint) balances;
    mapping(address => uint) unclaimedRewards;
    mapping(address => uint) lastUpdatedTime;
    address public tokenAddress;
    uint256 public constant REWARD_PER_SEC_PER_ETH = 1;
    address public owner;

    event Staked(address indexed user, uint amount);
    event Unstaked(address indexed user, uint amount);
    event RewardsClaimed(address indexed user, uint amount);

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        tokenAddress = _tokenAddress;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: caller is not the owner");
        _;
    }

    receive() external payable {
        stake();
    }

    function stake() public payable {
        require(msg.value > 0, "Stake amount must be greater than zero");

        if (lastUpdatedTime[msg.sender] == 0) {
            lastUpdatedTime[msg.sender] = block.timestamp;
        } else {
            unclaimedRewards[msg.sender] +=
                calculateReward(msg.sender);
            lastUpdatedTime[msg.sender] = block.timestamp;
        }

        balances[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function unStake(uint _amount) public {
        require(_amount > 0, "Unstake amount must be greater than zero");
        require(_amount <= balances[msg.sender], "Insufficient balance to unstake");

        unclaimedRewards[msg.sender] +=
            calculateReward(msg.sender);
        lastUpdatedTime[msg.sender] = block.timestamp;
        balances[msg.sender] -= _amount;

        payable(msg.sender).transfer(_amount);
        emit Unstaked(msg.sender, _amount);
    }

    function getRewards(address _address) public view returns (uint) {
        require(_address != address(0), "Invalid address");

        uint currentReward = unclaimedRewards[_address];
        uint newReward = calculateReward(_address);

        return currentReward + newReward;
    }

    function claimRewards() public {
        uint currentReward = unclaimedRewards[msg.sender];
        require(currentReward > 0 || balances[msg.sender] > 0, "No rewards available to claim");

        uint newReward = calculateReward(msg.sender);
        unclaimedRewards[msg.sender] += newReward;

        uint totalReward = currentReward + newReward;
        require(totalReward > 0, "No rewards to claim");

        require(tokenAddress != address(0), "Token address not set");
        ItokenAddress(tokenAddress).mint(msg.sender, totalReward);

        unclaimedRewards[msg.sender] = 0;
        lastUpdatedTime[msg.sender] = block.timestamp;

        emit RewardsClaimed(msg.sender, totalReward);
    }

    function calculateReward(address _address) public view returns(uint) {
        return (block.timestamp - lastUpdatedTime[_address]) *
                balances[_address] *
                REWARD_PER_SEC_PER_ETH;
    }

    function updateTokenAddress(address _tokenAddress) public onlyOwner {
        require(_tokenAddress != address(0), "Invalid token address");
        tokenAddress = _tokenAddress;
    }

    function balanceOf(address _address) public view returns (uint) {
        require(_address != address(0), "Invalid address");
        return balances[_address];
    }
}
