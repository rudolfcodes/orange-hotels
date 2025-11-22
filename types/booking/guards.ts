import { DateRange, GuestCount } from "./types";

function hasValidDateRange(dateRange: DateRange): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    !!dateRange.checkIn &&
    !!dateRange.checkOut &&
    dateRange.checkIn < dateRange.checkOut &&
    dateRange.checkIn >= today
  );
}

function hasAtLeastOneGuest(guestCount: GuestCount): boolean {
  return guestCount.adults + guestCount.children > 0;
}

function isSuccessResponse<T>(response: {
  status: "success" | "error";
  data?: T;
  error?: string;
}): response is { status: "success"; data: T } {
  return response.status === "success" && response.data !== undefined;
}

function isErrorResponse<T>(response: {
  status: "success" | "error";
  data?: T;
  error?: string;
}): response is { status: "error"; error: string } {
  return response.status === "error" && response.error !== undefined;
}

function isEmptyResponse<T>(response: {
  status: "success" | "error";
  data?: T;
  error?: string;
}): response is { status: "success"; data: T } {
  return response.status === "success" && response.data === undefined;
}

export {
  hasValidDateRange,
  hasAtLeastOneGuest,
  isSuccessResponse,
  isErrorResponse,
  isEmptyResponse,
};
