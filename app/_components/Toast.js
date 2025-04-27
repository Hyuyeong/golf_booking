"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Toast({ status, message }) {
  const [hasShownToast, setHasShownToast] = useState(false);
  const toastMethods = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warning,
  };

  const router = useRouter();

  // Effect hook to show the toast only once
  useEffect(() => {
    if (!hasShownToast) {
      const toastMethod = toastMethods[status];
      if (toastMethod) {
        toastMethod(message);
        setHasShownToast(true); // Mark the toast as shown
        router.push("/login"); // Navigate after showing the toast
      }
    }
  }, []);

  return null; // No UI needed for the Toast component, since toast notifications will be displayed
}

export default Toast;
