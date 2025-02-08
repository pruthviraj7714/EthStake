// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

interface IToken {
    function mint(address _account, uint256 _amount) external;
}

contract StakingContract {
    mapping(address => uint256) private balances;
    mapping(address => uint256) private unclaimedRewards;
    mapping(address => uint256) private lastUpdatedTime;

    address public immutable owner;
    address public tokenAddress;
    uint256 public constant REWARD_PER_SEC_PER_ETH = 1;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event TokenAddressUpdated(address indexed newTokenAddress);

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        tokenAddress = _tokenAddress;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    receive() external payable {
        stake();
    }

    function stake() public payable {
        require(msg.value > 0, "Stake amount must be greater than zero");
        _updateRewards(msg.sender);
        balances[msg.sender] += msg.value;

        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 _amount) external {
        require(_amount > 0, "Unstake amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        _updateRewards(msg.sender);
        balances[msg.sender] -= _amount;

        if (balances[msg.sender] == 0) {
            lastUpdatedTime[msg.sender] = 0;
        }

        (bool sent, ) = payable(msg.sender).call{value: _amount}("");
        require(sent, "Failed to send ETH");

        emit Unstaked(msg.sender, _amount);
    }

    function claimRewards() external {
        uint256 totalReward = _updateRewards(msg.sender);
        require(totalReward > 0, "No rewards to claim");

        IToken(tokenAddress).mint(msg.sender, totalReward);

        unclaimedRewards[msg.sender] = 0;
        lastUpdatedTime[msg.sender] = block.timestamp;

        emit RewardsClaimed(msg.sender, totalReward);
    }

    function getRewards(address _address) external view returns (uint256) {
        require(_address != address(0), "Invalid address");
        return _calculateRewards(_address) + unclaimedRewards[_address];
    }

    function updateTokenAddress(address _newTokenAddress) external onlyOwner {
        require(_newTokenAddress != address(0), "Invalid token address");
        tokenAddress = _newTokenAddress;
        emit TokenAddressUpdated(_newTokenAddress);
    }

    function balanceOf(address _address) external view returns (uint256) {
        return balances[_address];
    }

    function _updateRewards(address _user) private returns (uint256) {
        uint256 newReward = _calculateRewards(_user);
        unclaimedRewards[_user] += newReward;
        lastUpdatedTime[_user] = block.timestamp;
        return unclaimedRewards[_user];
    }

    function _calculateRewards(address _user) private view returns (uint256) {
        uint256 timeDiff = block.timestamp - lastUpdatedTime[_user];
        return timeDiff * balances[_user] * REWARD_PER_SEC_PER_ETH;
    }
}
