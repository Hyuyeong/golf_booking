// app/account/profile/ConfirmModal.js
"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  const handleOutsideClick = (e) => {
    // 모달 외부 클릭 시 모달 닫기
    if (e.target.id === "modal-overlay") {
      onCancel();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="modal-overlay"
          onClick={handleOutsideClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white p-6 rounded-2xl shadow-2xl text-center w-80 relative"
          >
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to cancel?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
              >
                Yes
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-all duration-300"
              >
                No
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
