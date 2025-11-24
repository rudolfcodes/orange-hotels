import { ApiResponse } from "../api/response/response";
import { DateRange, GuestCount } from "../booking/types";

type StarRating = 1 | 2 | 3 | 4 | 5;

type Rating = {
  userId: number;
  starRating: StarRating;
};

type Hotel = {
  hotelId: number;
  name: string;
  location: string;
  description: string;
  rooms: Room[];
  maxGuests: number;
  pricePerNight: number;
  amenities: string[];
  starRating: StarRating;
  reviews: Rating[];
  images: string[];
  currency: "EUR" | "AUD";
};

type HotelCard = {
  hotelId: number;
  title: string;
  featuredImage: string;
  description: string;
  location: string;
  pricePerNight: number;
  rating: number;
  currency: "EUR" | "AUD";
};

type Room = {
  id: number;
  hotelId: number;
  type: string;
  capacity: number;
  pricePerNight: number;
  currency: "EUR" | "AUD";
  maxGuests: number;
  hasBreakfast: boolean;
  isAvailable: (checkIn: Date, checkOut: Date) => boolean;
};

type AvailableHotelsResponse = {
  hotels: Hotel[];
};

type AvailableRoomsResponse = Pick<Hotel, "hotelId" | "name"> & {
  rooms: Room[];
};

type BookingConfirmation = {
  bookingId: string;
  hotelId: number;
  totalPrice: number;
  roomType: string;
  currency: "EUR" | "AUD";
  checkIn: Date;
  checkOut: Date;
};

type FilterOptions = {
  name?: string;
  location?: string;
  guestCount?: GuestCount;
  dateRange?: DateRange;
  minRating?: number;
};

type HotelSearchResponse = ApiResponse<Hotel[]>;
type RoomAvailabilityResponse = ApiResponse<Room[]>;
type BookingConfirmationResponse = ApiResponse<BookingConfirmation>;

export type {
  Hotel,
  HotelCard,
  Room,
  AvailableHotelsResponse,
  AvailableRoomsResponse,
  BookingConfirmation,
  HotelSearchResponse,
  RoomAvailabilityResponse,
  BookingConfirmationResponse,
  FilterOptions,
};
