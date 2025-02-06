"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Coins } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [stakedAmount, setStakedAmount] = useState(0);
  const [rewards, setRewards] = useState(0);

  const stake = (amount: number) => {
    // Implement staking logic here
    setStakedAmount(stakedAmount + amount);
  };

  const unstake = (amount: number) => {
    // Implement unstaking logic here
    setStakedAmount(Math.max(0, stakedAmount - amount));
  };

  const claimRewards = () => {
    // Implement reward claiming logic here
    setRewards(0);
  };

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
                  <p className="text-2xl font-bold">{stakedAmount} ETH</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Current Rewards
                  </p>
                  <p className="text-2xl font-bold">{rewards} OrcaCoin</p>
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
                      step="0.01"
                      required
                    />
                    <Button type="submit">
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
                    const amount = Number.parseFloat(
                      (e.target as HTMLFormElement).unstakeAmount.value
                    );
                    if (!isNaN(amount)) unstake(amount);
                  }}
                >
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Amount to unstake"
                      name="unstakeAmount"
                      min="0"
                      max={stakedAmount}
                      step="0.01"
                      required
                    />
                    <Button type="submit">
                      <ArrowDownCircle className="mr-2 h-4 w-4" />
                      Unstake
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rewards</CardTitle>
              <CardDescription>
                Claim your earned OrcaCoin rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{rewards} OrcaCoin</p>
              <Button onClick={claimRewards} disabled={rewards === 0}>
                <Coins className="mr-2 h-4 w-4" />
                Claim Rewards
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">
          © 2024 EthStake. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
