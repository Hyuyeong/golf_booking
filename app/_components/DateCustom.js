import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";

export default function MyDatePicker({ onChange, selectedDate }) {
  // const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="flex justify-center">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onChange(date)}
        dateFormat="yyyy-MM-dd"
        className="border p-3 rounded-md text-center"
        placeholderText="Select a date"
      />
    </div>
  );
}
