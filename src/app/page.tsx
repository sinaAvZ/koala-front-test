import HomePopularList from "@/components/organisms/homePopularList/homePopularList";
import { getMarketData } from "@/lib/dataLayer/queries/use24HourChangesMarket";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function TradingListsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["marketData"],
    queryFn: getMarketData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <HomePopularList />
        </main>
      </div>
    </HydrationBoundary>
  );
}
