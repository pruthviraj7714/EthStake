"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useAccount, useWriteContract } from "wagmi";
import { config } from "@/config/config";
import { Address } from "viem";
import { STAKING_CONTRACT_ABI } from "@/lib/abi";
import { toast } from "sonner";
import { readContract } from "wagmi/actions";
import { STAKING_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "@/lib/constants";

export default function Home() {
  const [stakedAmount, setStakedAmount] = useState<any>(0);
  const [rewards, setRewards] = useState<any>(0);
  const { writeContractAsync } = useWriteContract({
    config: config,
  });
  const [stakingLoading, setStakingLoading] = useState(false);
  const [unstakingLoading, setUnstakingLoading] = useState(false);
  const { address } = useAccount();

  const updateAddress = async () => {
    try {
      // await writeContractAsync({
      //   abi: ORCA_TOKEN_ABI,
      //   address: TOKEN_CONTRACT_ADDRESS as `0x${string}`,
      //   functionName: "updateStakingContract",
      //   args: [STAKING_CONTRACT_ADDRESS],
      //   account: address,
      // });

      await writeContractAsync({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "updateTokenAddress",
        args: [TOKEN_CONTRACT_ADDRESS],
        account: address,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const stake = async (amount: number) => {
    setStakingLoading(true);
    try {
      await writeContractAsync({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS as `0x${Address}`,
        functionName: "stake",
        value: BigInt(amount * 10 ** 18),
      });
      setStakedAmount(stakedAmount + BigInt(amount * 10 ** 18));
    } catch (error : any) {
      toast.error(error.message);
    } finally {
      setStakingLoading(false);
    }
  
  };

  const unstake = async (amount: any) => {
    setUnstakingLoading(true);
    try {
      await writeContractAsync({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS as `0x${Address}`,
        functionName: "unstake",
        account: address,
        args: [amount * 10 ** 18],
      });
      setStakedAmount(stakedAmount > BigInt(amount * 10 ** 18) ? stakedAmount - BigInt(amount * 10 ** 18) : BigInt(0));
      
    } catch (error : any) {
      toast.error(error.message);
    } finally {
      setUnstakingLoading(false);
    }
  };

  const claimRewards = async () => {
    await writeContractAsync({
      abi: STAKING_CONTRACT_ABI,
      address: STAKING_CONTRACT_ADDRESS as `0x${Address}`,
      functionName: "claimRewards",
      account: address as `0x${Address}`,
    });
  };

  const getRewards = async () => {
    try {
      const data = await readContract(config, {
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "getRewards",
        args: [address as Address],
      });

      setRewards(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const balanceOfAddress = async () => {
    try {
      const data = await readContract(config, {
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS as `0x${Address}`,
        functionName: "balanceOf",
        args: [address],
        account: address,
      });
      setStakedAmount(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(address) {
      balanceOfAddress();
      getRewards();
    }
  }, [address]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Staking Overview</CardTitle>
              <CardDescription>Your current staking statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Total Staked
                  </p>
                  <p className="text-2xl font-bold">
                    {Number(stakedAmount) / 10 ** 18} ETH
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Current Rewards
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">
                      {Number(rewards) / 10 ** 18} OrcaCoin
                    </p>
                    <Button
                      variant={"custom"}
                      className="ml-2"
                      onClick={getRewards}
                    >
                      Get Rewards
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stake ETH</CardTitle>
                <CardDescription>
                  Stake your ETH to earn OrcaCoin rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const amount = Number.parseFloat(
                      (e.target as HTMLFormElement).stakeAmount.value
                    );
                    if (!isNaN(amount)) stake(amount);
                  }}
                >
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Amount to stake"
                      name="stakeAmount"
                      min="0"
                      step="0.0001"
                      required
                    />
                    <Button disabled={stakingLoading} variant={"custom"} type="submit">
                      <ArrowUpCircle className="mr-2 h-4 w-4" />
                      Stake
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unstake ETH</CardTitle>
                <CardDescription>Withdraw your staked ETH</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    //@ts-ignore
                    unstake(e.target.unstakeAmount.value);
                  }}
                >
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Amount to unstake"
                      name="unstakeAmount"
                      required
                    />
                    <Button disabled={unstakingLoading} variant={"custom"} type="submit">
                      <ArrowDownCircle className="mr-2 h-4 w-4" />
                      Unstake
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* <div>
            <Button onClick={updateAddress}>
              Update Address
            </Button>
          </div> */}

          <Card>
            <CardHeader>
              <CardTitle>Claim Rewards</CardTitle>
              <CardDescription>Claim your ORC Tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant={"custom"} onClick={claimRewards}>
                Claim Reward
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
