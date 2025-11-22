type Hotel = {
  id: number;
  name: string;
  location: string;
  maxGuests: number;
  pricePerNight: number;
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
