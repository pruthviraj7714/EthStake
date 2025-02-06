"use client";
import { Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Navbar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  
  const connectWallet = () => {
    setIsWalletConnected(true);
  };
  return (
    <header className="px-4 lg:px-6 h-20 flex justify-between items-center border-b border-gray-800">
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

      <Button
        onClick={connectWallet}
        className={`ml-4 rounded-xl ${
          isWalletConnected
            ? "bg-green-400 hover:bg-green-500"
            : "bg-yellow-400 hover:bg-yellow-400"
        }`}
      >
        <Wallet className="mr-2 h-4 w-4 " />
        {isWalletConnected ? "Connected" : "Connect Wallet"}
      </Button>
    </header>
  );
}
