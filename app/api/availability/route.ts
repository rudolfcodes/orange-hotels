import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  BookingSearchInput,
  BookingSearchResult,
} from "../../../types/booking/types";
import {
  hasValidDateRange,
  hasAtLeastOneGuest,
} from "../../../types/booking/guards";
import { hotelData } from "../hotels/hotels-data";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: BookingSearchInput = await request.json();

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
    const results: BookingSearchResult[] = hotelData.map((hotel) => ({
      hotelId: hotel.id.toString(),
      hotelName: hotel.name,
      isAvailable: Math.random() > 0.5,
      pricePerNight: 100 + Math.floor(Math.random() * 200),
      currency: "EUR" as const, // Set currency as the exact literal type "EUR"
    }));
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
