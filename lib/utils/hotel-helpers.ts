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

export { formatHotelsForCards };
