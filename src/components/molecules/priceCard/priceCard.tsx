"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/atoms";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/atoms";

interface PriceCardProps {
  symbol: string;
  price: string;
  priceChangePercent: string;
  onAddToWatchList?: () => void;
  onRemoveFromWatchList?: () => void;
  isInWatchList?: boolean;
  showActions?: boolean;
}

export default function PriceCard({
  symbol,
  price,
  priceChangePercent,
  onAddToWatchList,
  onRemoveFromWatchList,
  isInWatchList,
  showActions = true,
}: PriceCardProps) {
  const changePercent = Number.parseFloat(priceChangePercent);
  const isPositive = changePercent >= 0;
  const formattedPrice = Number.parseFloat(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });

  return (
    <Card className="p-4 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-mono font-semibold text-lg text-foreground">{symbol}</h3>
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}
            >
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>
                {isPositive ? "+" : ""}
                {changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
          <p className="font-mono text-2xl font-bold text-foreground">${formattedPrice}</p>
        </div>

        {showActions && (
          <div className="flex flex-col gap-2">
            <Button variant={"outline"} asChild>
              <Link href={`/trades/${symbol}`}>View Trades</Link>
            </Button>
            {isInWatchList ? (
              <Button onClick={onRemoveFromWatchList} variant={"destructive"}>
                Remove
              </Button>
            ) : (
              <Button onClick={onAddToWatchList}>Add to Watch</Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
