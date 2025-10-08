"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/atoms/card";
import { cn } from "@/lib/utils";
import { Button } from "../../atoms/button";
import Link from "next/link";

interface PriceCardProps {
  symbol: string;
  price: string;
  priceChangePercent: string;
  onViewTrades?: () => void;
  onAddToWatchList?: () => void;
  onRemoveFromWatchList?: () => void;
  isInWatchList?: boolean;
  showActions?: boolean;
}

export default function PriceCard({
  symbol,
  price,
  priceChangePercent,
  onViewTrades,
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
            <Link
              href={`symbol/${symbol}`}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              View Trades
            </Link>
            {isInWatchList ? (
              <Button
                onClick={onRemoveFromWatchList}
                className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg text-sm font-medium hover:bg-destructive/30 transition-colors whitespace-nowrap"
              >
                Remove
              </Button>
            ) : (
              <Button
                onClick={onAddToWatchList}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors whitespace-nowrap"
              >
                Add to Watch
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
