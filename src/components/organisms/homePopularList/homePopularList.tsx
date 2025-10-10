"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef, useDeferredValue } from "react";
import { use24HourChangesMarket } from "@/lib/dataLayer/queries/use24HourChangesMarket";
import { TOP_10_COINS } from "@/lib/constants/popularCoins";
import { Market24 } from "@/lib/types/api/market.interface";
import { Skeleton } from "@/components/atoms";
import EmptyState from "@/components/atoms/emptyState/emptyState";
import EmptySearchState from "@/components/atoms/emptySearchState/emptySearchState";
import PriceCard from "@/components/molecules/priceCard/priceCard";
import SearchBar from "@/components/molecules/searchBar/searchBar";
import { toast } from "sonner";
import { useBinanceWebSocket } from "@/lib/hooks/useBinanceWebSocket";

const HomePopularList: React.FC = () => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [pricesArray, setPricesArray] = useState<Market24[]>([]);
  const pricesMapRef = useRef<Map<string, Market24>>(new Map());
  const [watchList, setWatchList] = useState<string[]>([]);

  const { data, isLoading, error } = use24HourChangesMarket();

  const handleSearch = useCallback((value: string) => setSearch(value), []);

  const handleAddToWatchList = useCallback((symbol: string) => {
    setWatchList((prev) => (prev.includes(symbol) ? prev : [...prev, symbol]));
  }, []);

  const handleRemoveFromWatchList = useCallback((symbol: string) => {
    setWatchList((prev) => prev.filter((s) => s !== symbol));
  }, []);

  useEffect(() => {
    const savedWatchList = localStorage.getItem("watchList");
    if (savedWatchList) {
      try {
        const parsed = JSON.parse(savedWatchList);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
          setWatchList(parsed);
        } else {
          console.warn("Invalid watchList format in localStorage");
          toast.error("Invalid watchList format in localStorage.");
        }
      } catch (err) {
        console.error("Error parsing watchList from localStorage:", err);
        toast.error("Failed to load watchList from localStorage.");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    if (!isLoading && data) {
      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        toast.error("Invalid market data format received.");
        return;
      }
      const filtered = data.filter((item) => TOP_10_COINS.includes(item.symbol));
      setPricesArray(filtered);
      const map = new Map<string, Market24>();
      filtered.forEach((coin) => map.set(coin.symbol, coin));
      pricesMapRef.current = map;
    }
  }, [data, isLoading]);

  const handlePriceUpdate = useCallback((updatedPrices: Market24[]) => {
    setPricesArray(updatedPrices);
  }, []);

  useBinanceWebSocket(pricesArray, pricesMapRef, handlePriceUpdate);

  const displayedCoins = useMemo(
    () => pricesArray.filter((item) => item.symbol.toLowerCase().includes(deferredSearch.toLowerCase())),
    [pricesArray, deferredSearch]
  );

  const renderWatchList = () => {
    if (watchList.length === 0) {
      return <div className="text-center py-4 text-gray-500">Your watch list is empty. Add coins to track them!</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {watchList.map((symbol) => {
          const coin = pricesArray.find((c) => c.symbol === symbol);
          return (
            <PriceCard
              key={symbol}
              symbol={symbol}
              price={coin?.lastPrice || "0"}
              priceChangePercent={coin?.priceChangePercent || "0"}
              onAddToWatchList={() => handleAddToWatchList(symbol)}
              onRemoveFromWatchList={() => handleRemoveFromWatchList(symbol)}
              isInWatchList={true}
            />
          );
        })}
      </div>
    );
  };

  const renderContent = () => {
    if (error)
      return (
        <div className="text-center py-8 text-red-500" role="alert">
          Failed to load market data. Please try again later.
        </div>
      );

    if (isLoading)
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      );

    if (!data || pricesArray.length === 0) return <EmptyState />;
    if (displayedCoins.length === 0 && deferredSearch) return <EmptySearchState search={deferredSearch} />;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCoins.map((coin) => (
          <PriceCard
            key={coin.symbol}
            symbol={coin.symbol}
            price={coin.lastPrice || "0"}
            priceChangePercent={coin.priceChangePercent || "0"}
            onAddToWatchList={() => handleAddToWatchList(coin.symbol)}
            onRemoveFromWatchList={() => handleRemoveFromWatchList(coin.symbol)}
            isInWatchList={watchList.includes(coin.symbol)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
        {renderWatchList()}
      </section>

      <div className="mb-6">
        <SearchBar value={search} onChange={handleSearch} placeholder="Search trading pairs (e.g., BTCUSDT)..." />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Popular Coins</h2>
        {renderContent()}
      </section>
    </div>
  );
};

export default HomePopularList;
