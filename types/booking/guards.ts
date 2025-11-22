import { DateRange, GuestCount } from "./types";

function hasValidDateRange(dateRange: DateRange): boolean {
  return (
    !!dateRange.checkIn &&
    !!dateRange.checkOut &&
    dateRange.checkIn < dateRange.checkOut
  );
}

function hasAtLeastOneGuest(guestCount: GuestCount): boolean {
  return guestCount.adults + guestCount.children > 0;
}

export { hasValidDateRange, hasAtLeastOneGuest };
