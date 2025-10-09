import { TrendingUp } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Koala Blockchain</h1>
            <p className="text-sm text-muted-foreground">Real-time Crypto Tracker </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
