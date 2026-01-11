export type Camper = {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: string;
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: string;
    engine: string;
    AC: boolean;
    bathroom: boolean;
    kitchen: boolean;
    TV: boolean;
    radio: boolean;
    refrigerator: boolean;
    microwave: boolean;
    gas: boolean;
    water: boolean;
    gallery: { thumb: string; original: string }[];
    reviews: { reviewer_name: string; reviewer_rating: number; comment: string }[];

}

export type CampListResponse = {
  items: Camper[];
  total: number;
};

export type CamperFilters = {
  location?: string;
  form?: string;
  transmission?: "automatic" | "";
  AC?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  bathroom?: boolean;
  page: number;
  limit: number;
};
