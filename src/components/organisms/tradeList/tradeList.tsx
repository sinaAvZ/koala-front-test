"use client";

import React from "react";
import { useTrades } from "@/lib/dataLayer/queries/useTrades";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/atoms";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { tradeColumns } from "./columns";
import DataTable from "@/components/molecules/table/dataTable";

interface TradeListProps {
  symbol: string;
  limit?: number;
}

const TradeList: React.FC<TradeListProps> = ({ symbol, limit = 20 }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch, isFetching } = useTrades({ symbol, limit });

  const handleRefresh = () => {
    refetch();
    toast.success("Trade list refreshed");
  };

  const handleBack = () => {
    router.back();
  };

  // Use the imported column definitions
  const columns = tradeColumns;

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                Trade List - {symbol}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-red-500" role="alert">
                Failed to load trade data. Please try again later.
              </div>
              <div className="flex justify-center mt-4">
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                Trade List - {symbol}
              </CardTitle>
              <Button onClick={handleRefresh} variant="outline" size="sm" disabled={isFetching}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={data || []}
              columns={columns}
              isLoading={isLoading}
              error={error}
              emptyMessage="No trades found."
              loadingRows={10}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradeList;
