"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "@/components/molecules/searchBar/searchBar";
import PriceCard from "@/components/molecules/priceCard/priceCard";

type PriceData = {
  [symbol: string]: {
    price: string;
    priceChangePercent: string;
  };
};

const HomePopularList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [prices, setPrices] = useState<PriceData>({});
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // وب‌سوکت را باز کن
    console.log('web socket start')
    ws.current = new WebSocket("wss://stream.binance.com:9443");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // فقط دیتاهای trade را مدیریت می‌کنیم
      if (data.e === "trade") {
        setPrices((prev) => ({
          ...prev,
          [data.s]: {
            price: data.p,
            priceChangePercent: prev[data.s]?.priceChangePercent || "0",
          },
        }));
      }
    };

    // ws.current.onclose = () => console.log("WebSocket disconnected");

    return () => ws.current?.close();
  }, []);

  // وقتی کاربر سرچ کرد، subscribe کن
  useEffect(() => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;
    const searchPair = search.toLowerCase();
    if (searchPair) {
      ws.current.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${searchPair}@trade`],
          id: Date.now(),
        })
      );
    }
  }, [search]);

  const handleSearch = useCallback((value: string) => setSearch(value), []);

  return (
    <div>
      <div className="mb-6">
        <SearchBar value={search} onChange={handleSearch} placeholder="Search trading pairs (e.g., BTCUSDT)..." />
      </div>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(prices).map((symbol) => (
            <PriceCard
              key={symbol}
              symbol={symbol}
              price={prices[symbol].price}
              priceChangePercent={prices[symbol].priceChangePercent}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePopularList;
