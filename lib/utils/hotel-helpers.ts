import { GuestCount } from "@/types/booking/types";
import { Hotel, HotelCard } from "@/types/hotel/hotel";

// Format hotels to card structure to render hotel data in cards
const formatHotelsForCards = (hotels: Hotel[]): HotelCard[] => {
  if (!hotels.length) return [];
  return hotels.map((hotel) => ({
    hotelId: hotel.hotelId,
    title: hotel.name,
    featuredImage: hotel.images[0] || "/placeholder-hotel.jpg",
    description:
      hotel.description.substring(0, 150) +
      (hotel.description.length > 150 ? "..." : ""),
    location: hotel.location,
    pricePerNight: hotel.pricePerNight,
    rating: hotel.starRating,
    currency: hotel.currency,
  }));
};

const getGuestTotal = (guestCount: GuestCount) => {
  const { adults, children } = guestCount;
  return [adults, children].reduce((acc, curr) => acc + curr, 0);
};

const findCheapestHotel = (hotels: Hotel[]): Hotel | undefined => {
  if (!hotels.length) return undefined;

  return hotels.reduce((cheapest, current) => {
    return current.pricePerNight < cheapest.pricePerNight ? current : cheapest;
  });
};

const getAverageHotelRating = (hotel: Hotel): number => {
  const sum = hotel.reviews.reduce((sum, current) => {
    return sum + current.starRating;
  }, 0);

  return sum / hotel.reviews.length;
};

const getAverageHotelPrice = (hotels: Hotel[]): number => {
  if (!hotels.length) return 0;

  const sum = hotels.reduce((acc, current) => {
    return acc + current.pricePerNight;
  }, 0);

  return sum / hotels.length;
};

const sortHotelsByPrice = (
  hotels: Hotel[],
  ascending: boolean = true
): Hotel[] => {
  return [...hotels].sort((hotelA, hotelB) =>
    ascending
      ? hotelA.pricePerNight - hotelB.pricePerNight
      : hotelB.pricePerNight - hotelA.pricePerNight
  );
};

export {
  formatHotelsForCards,
  getGuestTotal,
  findCheapestHotel,
  getAverageHotelRating,
  getAverageHotelPrice,
  sortHotelsByPrice,
};
