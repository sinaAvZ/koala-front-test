import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Trade } from "@/lib/types/api/trade.interface";

// Price Cell Component
const PriceCell: React.FC<{ price: string }> = ({ price }) => {
  const formattedPrice = parseFloat(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  });

  return <span className="font-mono text-sm">${formattedPrice}</span>;
};

// Quantity Cell Component
const QuantityCell: React.FC<{ qty: string }> = ({ qty }) => {
  const formattedQty = parseFloat(qty).toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 8,
  });

  return <span className="font-mono text-sm">{formattedQty}</span>;
};

// Time Cell Component
const TimeCell: React.FC<{ time: number }> = ({ time }) => {
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return <span className="text-sm text-muted-foreground">{formattedTime}</span>;
};

// Side Cell Component
const SideCell: React.FC<{ isBuyerMaker: boolean }> = ({ isBuyerMaker }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isBuyerMaker
          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      }`}
    >
      {isBuyerMaker ? "SELL" : "BUY"}
    </span>
  );
};

// Column Definitions
export const tradeColumns: ColumnDef<Trade>[] = [
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => {
      const price = getValue() as string;
      return <PriceCell price={price} />;
    },
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ getValue }) => {
      const qty = getValue() as string;
      return <QuantityCell qty={qty} />;
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ getValue }) => {
      const time = getValue() as number;
      return <TimeCell time={time} />;
    },
  },
  {
    accessorKey: "isBuyerMaker",
    header: "Side",
    cell: ({ getValue }) => {
      const isBuyerMaker = getValue() as boolean;
      return <SideCell isBuyerMaker={isBuyerMaker} />;
    },
  },
];

// Export individual components for potential reuse
export { PriceCell, QuantityCell, TimeCell, SideCell };
