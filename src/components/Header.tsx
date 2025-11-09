import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export const Header = () => {
  const handleConnectWallet = () => {
    // Wallet connection logic will be implemented
    console.log("Connect wallet");
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xl">🐄</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">LivestockID</h1>
            <p className="text-xs text-muted-foreground">Blockchain Passport System</p>
          </div>
        </div>
        
        <Button onClick={handleConnectWallet} className="gap-2">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};
