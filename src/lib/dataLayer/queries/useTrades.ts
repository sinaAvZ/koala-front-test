import { getData } from "@/lib/core/apiServices";
import { Trade, TradeParams } from "@/lib/types/api/trade.interface";
import { useQuery } from "@tanstack/react-query";

export const getTrades = async (params: TradeParams): Promise<Trade[]> => {
  const { symbol, limit = 20 } = params;
  const url = `/trades?symbol=${symbol}&limit=${limit}`;
  return getData<Trade[]>(url);
};

export const useTrades = (params: TradeParams) => {
  return useQuery({
    queryKey: ["trades", params.symbol, params.limit],
    queryFn: () => getTrades(params),
    refetchInterval: 5000,
    staleTime: 2000,
  });
};
