"use client";
import { Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const disconnectWallet = () => {
    disconnect();
    router.push("/");
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
        onClick={disconnectWallet}
        className={`ml-4 rounded-xl text-white bg-red-400 hover:bg-red-400"`}
      >
        <Wallet className="mr-2 h-4 w-4 " />
        Disconnect Wallet
      </Button>
    </header>
  );
}
