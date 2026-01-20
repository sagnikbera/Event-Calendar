import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';

const Day = ({ day, rowIdx }) => {
  const daySelected = useSelector((state) => state.calendar.daySelected);

  function getCurrentDayClass() {
    let classes = '';
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && dayjs(daySelected).format(format);

    if (currDay === nowDay) {
      classes += 'bg-blue-600 text-white rounded-full w-7 ';
    }

    if (currDay === slcDay) {
      classes += 'bg-blue-100 text-blue-600 font-bold rounded-full w-7 ';
    }

    return classes;
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* day  */}
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
        )}
        {/* date  */}
        <p
          className={`text-sm font-semibold p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {day.format('DD')}
        </p>
      </header>
      <div className="flex-1 cursor-pointer">{/*event list*/}</div>
    </div>
  );
};

export default Day;
