import { ApiResponse } from "../api/response/response";

type Hotel = {
  hotelId: number;
  name: string;
  location: string;
  description: string;
  maxGuests: number;
  pricePerNight: number;
  amenities: string[];
  starRating: 1 | 2 | 3 | 4 | 5;
  images: string[];
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

type HotelSearchResponse = ApiResponse<Hotel[]>;
type RoomAvailabilityResponse = ApiResponse<Room[]>;
type BookingConfirmationResponse = ApiResponse<BookingConfirmation>;

export type {
  Hotel,
  Room,
  AvailableHotelsResponse,
  AvailableRoomsResponse,
  BookingConfirmation,
  HotelSearchResponse,
  RoomAvailabilityResponse,
  BookingConfirmationResponse,
};
