// app/account/profile/DeleteBookingForm.js
"use client";

import SubmitButton from "./SubmitButton";
import { deleteBooking } from "@/app/account/actions/deleteBooking";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function DeleteBookingForm({ bookingId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  async function handleDelete(formData) {
    // 모달 열기 전에 formData 저장
    setFormData(formData);
    setIsOpen(true);
  }

  async function confirmDelete() {
    if (!formData) return;

    try {
      await deleteBooking(formData); // 서버 삭제
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <>
      <form action={handleDelete}>
        <input type="hidden" name="bookingId" value={bookingId} />
        <SubmitButton context="Delete" status="Deleting" color="red" />
      </form>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}
