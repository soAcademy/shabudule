import React from "react";
import dayjs from "dayjs";
// Locales
import "dayjs/locale/pt";
// import localeDe from "dayjs/locale/de"; // With a custom alias for the locale object

import cn from "./cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export const generateData = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];
  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);
    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }

  return arrayOfDate;
};

export const Calendar = ({
  today,
  setToday,
  selectDate,
  setSelectDate,
  currentDate,
}) => {
  // console.log("generateDate", generateData());

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // console.log("selectDate", selectDate.toISOString());

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <p className="font-semibold">
          {months[today.month()]}, {today.year()}
        </p>
        <div className="flex items-center gap-5">
          <GrFormPrevious
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />
          <p
            className="cursor-pointer font-semibold"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            Today
          </p>
          <GrFormNext
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-7  bg-primary text-white rounded-t-md">
        {days.map((r, idx) => (
          <p key={idx} className="h-10 grid place-content-center text-sm">
            {r}
          </p>
        ))}
      </div>
      <div className="w-full grid grid-cols-7 bg-white rounded-b-md">
        {generateData(today.month(), today.year())?.map(
          ({ date, currentMonth, today }, idx) => (
            <div
              key={idx}
              className="h-10 border-t grid place-content-center text-sm"
            >
              <p
                className={cn(
                  currentMonth ? "" : "text-gray-400",
                  today ? "bg-primary text-white" : "",
                  selectDate.toDate().toDateString() ===
                    date.toDate().toDateString()
                    ? "bg-black text-white"
                    : "",
                  "h-8 w-8 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                )}
                onClick={() => {
                  setSelectDate(date);
                }}
              >
                {date.date()}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
