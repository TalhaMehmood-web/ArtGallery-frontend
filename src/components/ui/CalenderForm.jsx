/* eslint-disable react/prop-types */
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
const CalendarForm = ({ label, selectedDate, onDateChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full pl-3 font-normal text-left text-white bg-black border border-yellow-500 hover:text-white focus:bg-transparent hover:bg-transparent"
          >
            {selectedDate
              ? format(selectedDate, "dd-MMM-yyyy").toUpperCase() // Format the date
              : "Pick a date"}
            <CalendarIcon className="w-4 h-4 ml-auto text-white opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-none rounded-md"
          align="start"
        >
          <Calendar
            className={"bg-black text-white"}
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            disabled={(date) => date < today}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarForm;
