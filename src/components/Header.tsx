import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Header = () => {
  const { connected, publicKey } = useWallet();

  const handleConnectWallet = () => {
    const walletBtn = document.querySelector(".wallet-adapter-button");
    if (walletBtn) {
      walletBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    } else {
      console.error("Wallet button not found");
    }
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xl">🐄</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">LivestockID</h1>
            <p className="text-xs text-muted-foreground">Blockchain Passport System</p>
          </div>
        </div>

        {/* Connect Button */}
        <div className="relative">
          <Button onClick={handleConnectWallet} className="gap-2">
            <Wallet className="w-4 h-4" />
            {connected && publicKey
              ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`
              : "Connect Wallet"}
          </Button>

          {/* Hidden Wallet Button */}
          <div style={{ display: "none" }}>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </header>
  );
};
