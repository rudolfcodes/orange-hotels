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
      className="bg-dark-slate flex flex-col w-full p-5 max-w-70 rounded-lg hover:shadow-lg transition-shadow duration-300 text-soft-warm-white gap-2"
    >
      <NextImage
        className="border-7 border-primary-orange"
        width={280}
        height={300}
        src={featuredImage}
        alt={title}
      />
      <h2 className="text-xl font-black mt-2">{title}</h2>
      {location && <p className="text-sm text-soft-warm-white">{location}</p>}
      <p className="text-soft-warm-white mt-2 flex-1">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-soft-warm-white">
          {currency} {pricePerNight} / night
        </span>
        <span className="bg-orange-500 text-soft-warm-white px-2 py-1 rounded">
          {rating} ★
        </span>
      </div>
    </Link>
  );
};

export default HotelCard;
