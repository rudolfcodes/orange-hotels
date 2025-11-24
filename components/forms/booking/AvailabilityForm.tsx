/**
 * Booking form component for Orange Hotels
 * @returns {JSX.Element} The booking form element
 * Input to search for hotels based on:
 *  - Name
 *  - Guest Count
 *  - Rating
 *  - Date Range
 */

import { ChangeEvent, useState } from "react";
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
    guestCount: 1,
    rating: 0,
    dateRange: { checkIn: null, checkOut: null },
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "guestCount" || name === "rating" ? Number(value) : value,
    }));
  };

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
    if (!hasAtLeastOneGuest({ adults: formData.guestCount, children: 0 })) {
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
    <form className="booking-form">
      <Input
        label="Hotel Name"
        name="hotelName"
        type="text"
        onChange={handleInputChange}
        placeholder="Search by name or location..."
        value={formData.hotelName}
        error={error}
        required
      />

      <Input
        label="Guest Count"
        name="guestCount"
        type="number"
        onChange={handleInputChange}
        value={formData.guestCount.toString()}
        error={error}
        required
      />

      <Input
        label="Hotel Rating"
        name="rating"
        type="number"
        onChange={handleInputChange}
        value={formData.rating.toString()}
        error={error}
        required
      />

      <DatePicker
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
        className="mt-4 w-full"
        onClick={handleSubmit}
        disabled={!!error}
      >
        Hotels zoeken
      </BaseButton>
    </form>
  );
};

export default AvailabilityForm;
