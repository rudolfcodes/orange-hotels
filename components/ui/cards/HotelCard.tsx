import { HotelCard as HotelCardProps } from "@/types/hotel/hotel";
import NextImage from "next/image";
import Link from "next/link";

const HotelCard = ({
  hotelId,
  title,
  currency,
  description,
  featuredImage,
  location,
  pricePerNight,
  rating,
}: HotelCardProps) => {
  return (
    <Link
      href={`/hotels/${hotelId}`}
      className="bg-dark-slate flex-flex-col w-full p-3"
    >
      <NextImage src={featuredImage} alt={title} />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      {location && <p className="text-sm text-gray-300">{location}</p>}
      <p className="text-white mt-2 flex-1">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold">
          {currency} {pricePerNight} / night
        </span>
        <span className="bg-orange-500 text-white px-2 py-1 rounded">
          {rating} ★
        </span>
      </div>
    </Link>
  );
};

export default HotelCard;
