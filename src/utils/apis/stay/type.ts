export interface Property {
  id: number;
  type: string;
  name: string;
  catalog: Catalog;
}

interface Catalog {
  star_rating: number;
  address_full: string;
  review_count: number;
  review_rating: number;
  hero_image_url: {
    lg: string;
    md: string;
    sm: string;
    th: string;
    ori: string;
  };
}

export interface ConvertAvailability {
  room_name: string;
  room_size_sqm: number;
  room_bed_groups: string;
  room_images: {
    caption: string;
    size_sm: string;
  }[];
  net_rate_nightly: number[];
  meal_plan_description: string[];
  cancel_policy_description: string[];
  net_price_total_with_bonus: number[];
  strikethrough_rate_nightly: number[];
}
