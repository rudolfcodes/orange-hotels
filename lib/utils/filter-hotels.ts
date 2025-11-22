import { DateRange } from "@/types/booking/types";
import { FilterOptions, Hotel } from "@/types/hotel/hotel";

const filterHotelsByName = (name: string, hotels: Hotel[]) => {
  return hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(name.toLowerCase().trim())
  );
};

const filterHotelsByGuestCount = (guestCount: number, hotels: Hotel[]) => {
  return hotels.filter((hotel) => hotel.maxGuests >= guestCount);
};

const filterHotelsByRating = (rating: number, hotels: Hotel[]) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  return hotels.filter((hotel) => hotel.starRating === rating);
};

const filterHotelsByLocation = (location: string, hotels: Hotel[]) => {
  return hotels.filter((hotel) =>
    hotel.location.toLowerCase().includes(location.toLowerCase().trim())
  );
};

const filterHotelsByAvailability = (dateRange: DateRange, hotels: Hotel[]) => {
  if (!dateRange.checkIn || !dateRange.checkOut) {
    return [];
  }

  const checkIn = dateRange.checkIn;
  const checkOut = dateRange.checkOut;

  return hotels.filter((hotel) => {
    return hotel.rooms.some((room) => room.isAvailable(checkIn, checkOut));
  });
};

const filterHotels = (hotels: Hotel[], filters: FilterOptions) => {
  let filtered = hotels;

  if (filters.name) {
    filtered = filterHotelsByName(filters.name, filtered);
  }

  if (filters.location) {
    filtered = filterHotelsByLocation(filters.location, filtered);
  }

  if (filters.guestCount) {
    filtered = filterHotelsByGuestCount(filters.guestCount, filtered);
  }

  if (filters.dateRange) {
    filtered = filterHotelsByAvailability(filters.dateRange, filtered);
  }

  if (filters.minRating) {
    filtered = filterHotelsByRating(filters.minRating, filtered);
  }

  return filtered;
};

export {
  filterHotels,
  filterHotelsByName,
  filterHotelsByGuestCount,
  filterHotelsByRating,
  filterHotelsByLocation,
  filterHotelsByAvailability,
};
