import { getData } from "@/lib/core/apiServices";
import { Market24 } from "@/lib/types/api/market.interface";
import { useQuery } from "@tanstack/react-query";

export const getMarketData = async () => {
  const url = "/ticker/24hr";
  return getData<Market24[]>(url);
};

export const use24HourChangesMarket = () => {
  return useQuery({
    queryKey: ["marketData"],
    queryFn: getMarketData,
  });
};
