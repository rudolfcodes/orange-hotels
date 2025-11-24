"use client";

import HotelCard from "@/components/ui/cards/HotelCard";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { formatHotelsForCards } from "@/lib/utils/hotel-helpers";
import { FormData } from "@/types/booking/types";
import { HotelCard as HotelCardProps } from "@/types/hotel/hotel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Boeken Page Component
 * @returns {JSX.Element} The Boeken page
 * This page displays the hotel booking results based on user search criteria.
 */

// Async function that fetches hotel data based on params/searchData
// The function takes searchData from sessionStorage and fetches hotel data from the API
// It uses URLSearchParams to construct the query string for the API request
// It fetches the data from the api/availability endpoint and returns the JSON response
const fetchHotels = async (searchData: FormData) => {
  const params = new URLSearchParams({
    hotelName: searchData.hotelName,
    adults: searchData.guestCount.adults.toString(),
    children: searchData.guestCount.children.toString(),
    rating: searchData.rating.toString(),
    checkIn: searchData.dateRange.checkIn
      ? searchData.dateRange.checkIn.toISOString()
      : "",
    checkOut: searchData.dateRange.checkOut
      ? searchData.dateRange.checkOut.toISOString()
      : "",
  });

  const response = await fetch(`/api/availability?${params.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hotel data");
  }
  return response.json();
};

export default function BoekenPage() {
  const [searchData, setSearchData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("searchResults");
    if (!stored) {
      router.push("/");
      return;
    }
    const parsed = JSON.parse(stored);
    // Convert string dates back to Date objects
    if (parsed.dateRange.checkIn) {
      parsed.dateRange.checkIn = new Date(parsed.dateRange.checkIn);
    }
    if (parsed.dateRange.checkOut) {
      parsed.dateRange.checkOut = new Date(parsed.dateRange.checkOut);
    }
    setSearchData(parsed);
  }, [router]);

  const {
    data: hotels,
    isLoading,
    isError,
    error: fetchError,
  } = useQuery({
    queryKey: ["hotels", searchData],
    queryFn: () => fetchHotels(searchData as FormData),
    enabled: !!searchData,
  });

  const formattedHotels: HotelCardProps[] = hotels
    ? formatHotelsForCards(hotels)
    : [];

  console.log({ hotels, formattedHotels });

  if (!searchData && isLoading) {
    return <div>Wij vinden de beschikbare hotels...</div>;
  }

  if (isError) {
    setError(fetchError instanceof Error ? fetchError.message : "");
    console.log({ fetchError });
    console.log({ searchData });
    return (
      <div>Er is een fout opgetreden bij het ophalen van de hotelgegevens.</div>
    );
  }

  return (
    <main className="flex flex-col">
      <Header />
      <div className="grow">
        <h1>{formattedHotels.length} Hotels gevonden.</h1>
        <div className="flex flex-col gap-4 mt-4">
          {formattedHotels.map((hotel: HotelCardProps) => (
            <HotelCard key={hotel.hotelId} {...hotel} />
          ))}
        </div>
        {formattedHotels.length === 0 && (
          <div>Geen hotels gevonden die aan uw criteria voldoen.</div>
        )}
      </div>
      <Footer />
    </main>
  );
}
