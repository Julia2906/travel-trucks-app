"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./CamperList.module.css";

import CamperCard from "../CamperCard/CamperCard";
import { getCampers } from "@/lib/api";
import { useCampersStore } from "@/lib/store/camperStore";
import type { CampListResponse } from "@/types/camper";

export default function CamperList() {
  const activeFilters = useCampersStore((s) => s.activeFilters);
  const setActiveFilters = useCampersStore((s) => s.setActiveFilters);

  const camperList = useCampersStore((s) => s.camperList);
  const total = useCampersStore((s) => s.total);

  const resetCampersList = useCampersStore((s) => s.resetCampersList);
  const addMoreCampers = useCampersStore((s) => s.addMoreCampers);

  const { data, isLoading, isError, error } = useQuery<CampListResponse>({
    queryKey: ["campers", activeFilters],
    queryFn: () =>getCampers({
  page: activeFilters.page,
  limit: activeFilters.limit,
  filters: activeFilters,
})
,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!data) return;

    // якщо це новий пошук (page=1) — очищаємо і заливаємо заново
    if (activeFilters.page === 1) {
      resetCampersList();
    }

    addMoreCampers(data.items ?? [], data.total);
  }, [data, activeFilters.page, resetCampersList, addMoreCampers]);

  console.log("activeFilters ->", activeFilters);

  const hasMore = camperList.length < total;

  return (
    <section>
      <div className="container">
        <h1 className="visuallyHidden">Camper List</h1>

        {isError && (
          <p>{error instanceof Error ? error.message : "Error loading campers"}</p>
        )}

        <ul className={css.list}>
          {camperList.map((camper) => (
            <CamperCard key={camper.id} item={camper} />
          ))}
        </ul>

        {!isLoading && !isError && hasMore && (
          <button
            className={css.loadMoreBtn}
            type="button"
            onClick={() =>
              setActiveFilters({ ...activeFilters, page: activeFilters.page + 1 })
            }
          >
            Load more
          </button>
        )}

        {isLoading && <p>Loading...</p>}
      </div>
    </section>
  );
}
