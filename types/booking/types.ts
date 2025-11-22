type GuestCount = {
  adults: number;
  children: number;
};

type DateRange = {
  checkIn: Date | null;
  checkOut: Date | null;
};

type BookingSearchInput = {
  guestCount: GuestCount;
  dateRange: DateRange;
};

type BookingSearchResult = {
  hotelId: string;
  hotelName: string;
  isAvailable: boolean;
  pricePerNight: number;
  currency: "EUR" | "AUD";
};

export type { GuestCount, DateRange, BookingSearchInput, BookingSearchResult };
