import TradeList from "@/components/organisms/tradeList/tradeList";
import { getTrades } from "@/lib/dataLayer/queries/useTrades";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

interface TradesPageProps {
  params: {
    symbol: string;
  };
}

export default async function TradesPage({ params }: TradesPageProps) {
  const { symbol } = await params;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["trades", symbol.toUpperCase(), 20],
      queryFn: () => getTrades({ symbol: symbol.toUpperCase(), limit: 20 }),
    });
  } catch (error) {
    console.error("Failed to prefetch trades:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TradeList symbol={symbol.toUpperCase()} limit={20} />
    </HydrationBoundary>
  );
}
