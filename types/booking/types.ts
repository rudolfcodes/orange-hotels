type GuestCount = {
  adults: number;
  children: number;
  childAges?: number[];
};

type DateRange = {
  checkIn: Date | null;
  checkOut: Date | null;
};

type BookingSearchInput = {
  guestCount: GuestCount;
  dateRange: DateRange;
  roomCount?: number;
  location?: string;
  hotelName?: string;
};

type BookingSearchResult = {
  hotelId: number;
  hotelName: string;
  isAvailable: boolean;
  pricePerNight: number;
  currency: "EUR" | "AUD";
};

export type { GuestCount, DateRange, BookingSearchInput, BookingSearchResult };
