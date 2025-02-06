"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export default function ConnectWalletPage() {
    const { connectors, connect, isSuccess} = useConnect();
    const { isConnected } = useAccount();
    const router = useRouter();

    useEffect(() => {
        if(isConnected) {
            router.push('/home');
        }
    }, [isConnected])



  return (
    <div className="flex justify-center bg-gray-900  text-white items-center h-screen">
    {connectors.map((connector) =>
      connector.name.toLowerCase() === "metamask" ? (
        <Button
          key={connector.id}
          className="bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600"
          onClick={() => connect({ connector })}
        >
          Connect to MetaMask
        </Button>
      ) : null
    )}
  </div>
  );
}
