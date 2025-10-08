"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import PriceCard from "@/components/molecules/priceCard/priceCard";
import SearchBar from "@/components/molecules/searchBar/searchBar";

const POPULAR_PAIRS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "ADAUSDT",
  "DOGEUSDT",
  "MATICUSDT",
  "DOTUSDT",
  "LTCUSDT",
];

interface PriceData {
  [symbol: string]: {
    price: string;
    priceChangePercent: string;
  };
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewTrades = (symbol: string) => {
    console.log("View trades for", symbol);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search trading pairs (e.g., BTC, ETH)..."
          />
        </div>

        {/* All Trading Pairs Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Popular Trading Pairs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_PAIRS.map((symbol) => (
              <PriceCard
                key={symbol}
                symbol={symbol}
                price={"0"}
                priceChangePercent={"0"}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Footer</p>
        </div>
      </footer>
    </div>
  );
}
