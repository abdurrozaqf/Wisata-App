export interface Request {
  query?: string;
  checkin?: Date | string;
  checkout?: Date | string;
  number_of_room?: number | string;
  guest_per_room?: number | string;
  id?: number | string;
  free_breakfast?: boolean;
  free_cancellation?: boolean;
}

export interface Availability {
  property_id: number;
  offer_summary_data: {};
  offer_list: {}[];
  offers: {}[];
}
