// import css from "./campers.module.css";
import CamperList from "@/components/CamperList/CamperList";
import FilterBar from "@/components/FilterBar/FilterBar";

import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import { DEFAULT_FILTERS } from "@/lib/store/camperStore";

export default async function Page() {
const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["campers", DEFAULT_FILTERS],
    queryFn: () => getCampers(DEFAULT_FILTERS),
  });

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FilterBar />
        <CamperList />
      </HydrationBoundary>
  );
}

