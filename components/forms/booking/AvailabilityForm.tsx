"use client";

/**
 * Booking form component for Orange Hotels
 * @returns {JSX.Element} The booking form element
 * Input to search for hotels based on:
 *  - Name
 *  - Guest Count
 *  - Rating
 *  - Date Range
 */

import { useEffect, useState } from "react";
import Input from "../Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormData } from "@/types/booking/types";
import BaseButton from "@/components/buttons/BaseButton";
import { hasAtLeastOneGuest, hasValidDateRange } from "@/types/booking/guards";
import { useRouter } from "next/navigation";

const AvailabilityForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    hotelName: "",
    guestCount: { adults: 0, children: 0 },
    rating: 0,
    dateRange: { checkIn: null, checkOut: null },
  });
  const [error, setError] = useState<string | null>(null);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  useEffect(() => {
    setReadyToSubmit(
      formData.hotelName.trim() !== "" &&
        hasValidDateRange(formData.dateRange) &&
        hasAtLeastOneGuest(formData.guestCount)
    );
  }, [formData]);

  const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    if (!formData.hotelName.trim()) {
      setError("Please enter a hotel name or location.");
      return;
    }

    if (!hasValidDateRange(formData.dateRange)) {
      setError("Please select a valid date range.");
      return;
    }
    if (!hasAtLeastOneGuest(formData.guestCount)) {
      setError("At least one guest is required.");
      return;
    }
    setError(null);

    try {
      sessionStorage.setItem("searchResults", JSON.stringify(formData));
      router.push("/hotels/boeken");
    } catch (error) {
      setError("An error occurred while searching for hotels.");
    }
  };

  return (
    <form className="booking-form w-full lg:w-fit flex flex-col lg:flex-row gap-0 bg-white shadow-lg rounded-lg max-w-6xl mt-[-75px] lg:mx-auto relative z-10">
      <Input
        className="border-b lg:border-b-0"
        label="Hotel Name"
        name="hotelName"
        type="text"
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            hotelName: e.target.value,
          }));
        }}
        placeholder="Search by name or location..."
        value={formData.hotelName}
        error={error}
        required
      />

      <Input
        className="border-b lg:border-b-0"
        label="Guest Count"
        name="guestCount"
        type="number"
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            guestCount: { ...prev.guestCount, adults: Number(e.target.value) },
          }));
        }}
        value={formData.guestCount.adults.toString()}
        error={error}
        required
      />

      <Input
        className="border-b lg:border-b-0 min-w-30"
        label="Hotel Rating"
        name="rating"
        type="number"
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            rating: Number(e.target.value),
          }));
        }}
        min={1}
        max={5}
        value={formData.rating.toString()}
        error={error}
        required
      />

      <DatePicker
        className="flex-1 w-full border-r lg:border-b-0 border-gray-200 p-4 min-h-20 outline-0"
        selectsRange
        startDate={formData.dateRange.checkIn}
        endDate={formData.dateRange.checkOut}
        onChange={(dates) => {
          const [start, end] = dates;
          setFormData((prev) => ({
            ...prev,
            dateRange: { checkIn: start, checkOut: end },
          }));
        }}
        minDate={new Date()}
        placeholderText="Select check-in and check-out"
      />

      <BaseButton
        type="submit"
        className={`w-full bg-primary-orange text-white px-4 rounded hover:bg-secondary-orange transition-colors h-[81px] lg:w-fit ${
          readyToSubmit ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!!error || !readyToSubmit}
      >
        Hotels zoeken
      </BaseButton>
    </form>
  );
};

export default AvailabilityForm;
