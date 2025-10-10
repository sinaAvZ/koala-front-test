import { useCallback, useEffect, useRef } from "react";
import { Market24 } from "../types/api/market.interface";

export const useBinanceWebSocket = (
  pricesArray: Market24[],
  pricesMapRef: React.RefObject<Map<string, Market24>>,
  onUpdate: (updatedPrices: Market24[]) => void
) => {
  const retryAttemptRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWebSocketUpdate = useCallback(
    (update: { s: string; c: string; o: string }) => {
      if (!update?.s || !update?.c || !update?.o) {
        return;
      }
      const coin = pricesMapRef.current.get(update.s);
      if (!coin) return;

      const lastPrice = update.c;
      const openPrice = update.o;
      const open = parseFloat(openPrice);
      const last = parseFloat(lastPrice);
      const changePercent = Number.isFinite(open) && open > 0 ? (((last - open) / open) * 100).toFixed(2) : "0";

      if (coin.lastPrice !== lastPrice || coin.priceChangePercent !== changePercent) {
        const updatedCoin: Market24 = { ...coin, lastPrice, priceChangePercent: changePercent };
        pricesMapRef.current.set(update.s, updatedCoin);
        onUpdate(Array.from(pricesMapRef.current.values()));
      }
    },
    [pricesMapRef, onUpdate]
  );

  useEffect(() => {
    if (!pricesArray.length) return;

    const baseUrl = process.env.NEXT_PUBLIC_BINANCE_WS_URL;
    const streams = pricesArray.map((coin) => coin.symbol.toLowerCase() + "@miniTicker").join("/");
    const connect = () => {
      if (
        wsRef.current &&
        (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)
      ) {
        try {
          wsRef.current.close();
        } catch {}
      }

      const ws = new WebSocket(`${baseUrl}/stream?streams=${streams}`);
      wsRef.current = ws;

      ws.onopen = () => {
        retryAttemptRef.current = 0;
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const update = message?.data;
        if (update) handleWebSocketUpdate(update);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        const attempt = (retryAttemptRef.current += 1);
        const delayMs = Math.min(30000, 500 * 2 ** (attempt - 1));
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, delayMs);
      };
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      if (wsRef.current) {
        try {
          wsRef.current.onopen = null;
          wsRef.current.onmessage = null;
          wsRef.current.onerror = null;
          wsRef.current.onclose = null;
          wsRef.current.close();
        } catch {}
        wsRef.current = null;
      }
    };
  }, [handleWebSocketUpdate, pricesArray]);
};
