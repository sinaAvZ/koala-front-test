"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import PriceCard from "@/components/molecules/priceCard/priceCard";
import SearchBar from "@/components/molecules/searchBar/searchBar";
import TradingLists from "@/components/templates/home/tradingLists";

interface PriceData {
  [symbol: string]: {
    price: string;
    priceChangePercent: string;
  };
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <TradingLists />
      </main>
    </div>
  );
}
