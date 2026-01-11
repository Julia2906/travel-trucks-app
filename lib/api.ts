import axios from "axios";
import { Camper, CampListResponse, CamperFilters } from "@/types/camper";

type Props = {
  page?: number;
  limit?: number;
  filters?: Partial<CamperFilters>;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getCampers = async ({
  page = 1,
  limit = 4,
  filters = {},
}: Props): Promise<CampListResponse> => {
  const res = await api.get<CampListResponse>("/campers", {
    params: {
      page,
      limit,
      ...filters,
    },
  });

  const params: Record<string, string | number | boolean> = { page, limit };

  if (filters.location?.trim()) params.location = filters.location.trim();
  if (filters.form) params.form = filters.form;

  if (filters.transmission) params.transmission = filters.transmission;

  if (filters.AC) params.AC = true;
  if (filters.kitchen) params.kitchen = true;
  if (filters.TV) params.TV = true;
  if (filters.bathroom) params.bathroom = true;

  // ✅ transmission: тільки automatic
  if (filters.transmission) params.transmission = "automatic";

  console.log("baseURL:", api.defaults.baseURL);

  return res.data;
};

export const getCamperById = async (id: string) => {
  const res = await api.get<Camper>(`/campers/${id}`);
  return res.data;
};
