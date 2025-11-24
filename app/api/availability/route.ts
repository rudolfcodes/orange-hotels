import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  hasValidDateRange,
  hasAtLeastOneGuest,
} from "../../../types/booking/guards";
import { hotelData } from "../hotels/hotels-data";
import { filterHotels } from "@/lib/utils/filter-hotels";
import { Hotel } from "@/types/hotel/hotel";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const hotelName = searchParams.get("hotelName");
    const rating = searchParams.get("rating");

    const dateRange = {
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
    };

    if (!hasValidDateRange(dateRange)) {
      return NextResponse.json(
        { error: "Invalid date range" },
        { status: 400 }
      );
    }

    const guestCount = {
      adults: adults ? parseInt(adults) : 0,
      children: children ? parseInt(children) : 0,
    };

    if (!hasAtLeastOneGuest(guestCount)) {
      return NextResponse.json(
        { error: "At least one guest required" },
        { status: 400 }
      );
    }

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
      minRating: rating ? parseFloat(rating) : undefined,
    });

    return NextResponse.json(realResults, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
