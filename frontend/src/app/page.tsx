import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Lock, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="https://i.pinimg.com/736x/9c/68/45/9c684562019d72fb0538fd97c994b8b9.jpg"
            alt="EthStake Logo"
            width={32}
            height={32}
            className="rounded-xl"
          />
          <span className="ml-2 text-xl font-bold">EthStake</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#rewards"
          >
            Rewards
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Stake ETH, Earn OrcaCoin
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Maximize your Ethereum holdings with EthStake. Secure,
                  efficient, and rewarding.
                </p>
              </div>
              <div className="">
                <Link href={'/connect-wallet'} className="bg-blue-600 px-6 py-2 hover:bg-blue-700 text-md rounded-xl text-white mt-2">
                  Start Staking
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-800"
        >
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Why Choose EthStake?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Lock className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Secure Staking</h3>
                <p className="text-gray-400">
                  Your ETH is protected by industry-leading security measures.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Coins className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Earn OrcaCoin</h3>
                <p className="text-gray-400">
                  Receive OrcaCoin rewards for your staked ETH.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <TrendingUp className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Competitive APY</h3>
                <p className="text-gray-400">
                  Enjoy some of the highest staking returns in the market.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold ">Connect Wallet</h3>
                <p className="text-gray-400">
                  Link your Ethereum wallet to our platform securely.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold">Stake Your ETH</h3>
                <p className="text-gray-400">
                  Choose the amount of ETH you want to stake.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Earn Rewards</h3>
                <p className="text-gray-400">
                  Start earning OrcaCoin rewards on your staked ETH.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="rewards"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-800"
        >
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Introducing OrcaCoin
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  The next-generation reward token for Ethereum stakers.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current APY</span>
                  <span className="font-bold text-blue-400">8.5%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
                  <div className="h-full w-[85%] bg-blue-500" />
                </div>
                <p className="text-xs text-gray-400">
                  *APY is variable and subject to change
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Staking?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                  Join thousands of Ethereum holders already earning OrcaCoin
                  rewards.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
                  Connect Wallet
                </Button>
                <p className="text-xs text-gray-400">
                  By connecting, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
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
