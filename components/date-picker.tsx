import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

interface DatePickerProps {
    date: Date
}

export default function DatePicker({
    date = new Date(),
}: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className="font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    // onSelect={}
                    // TODO: change db date
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}