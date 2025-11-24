import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BookingSearchInput } from "../../../types/booking/types";
import {
  hasValidDateRange,
  hasAtLeastOneGuest,
} from "../../../types/booking/guards";
import { hotelData } from "../hotels/hotels-data";
import { filterHotels } from "@/lib/utils/filter-hotels";
import { Hotel } from "@/types/hotel/hotel";

export async function GET(request: NextRequest) {
  try {
    // Parse request body
    const body: BookingSearchInput = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const hotelName = searchParams.get("hotelName");
    const minRating = searchParams.get("minRating");

    if (!hasValidDateRange(body.dateRange)) {
      return NextResponse.json(
        { error: "Invalid date range" },
        { status: 400 }
      );
    }

    if (!hasAtLeastOneGuest(body.guestCount)) {
      return NextResponse.json(
        { error: "At least one guest required" },
        { status: 400 }
      );
    }

    // Mock availability logic
    /* const results: BookingSearchResult[] = hotelData.map((hotel) => ({
      hotelId: hotel.hotelId,
      hotelName: hotel.name,
      isAvailable: Math.random() > 0.5,
      pricePerNight: 100 + Math.floor(Math.random() * 200),
      currency: "EUR" as const, // Set currency as the exact literal type "EUR"
    })); */

    const realResults: Hotel[] = filterHotels(hotelData, {
      name: hotelName || undefined,
      guestCount: {
        adults: adults ? parseInt(adults) : 0,
        children: children ? parseInt(children) : 0,
      },
      dateRange: {
        checkIn: checkIn ? new Date(checkIn) : null,
        checkOut: checkOut ? new Date(checkOut) : null,
      },
      minRating: minRating ? parseFloat(minRating) : undefined,
    });

    return NextResponse.json(realResults, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
