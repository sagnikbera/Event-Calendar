import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDaySelected,
  setSelectedEvent,
  toggleEventModal,
} from '../store/calendarSlice';

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const dispatch = useDispatch();

  const daySelected = useSelector((state) => state.calendar.daySelected);
  const savedEvents = useSelector((state) => state.calendar.savedEvents);

  useEffect(() => {
    const events = savedEvents.filter(
      (event) => dayjs(event.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDayEvents(events);
  }, [savedEvents, day]);

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
      <div
        className="flex-1 cursor-pointer overflow-y-auto"
        onClick={() => {
          dispatch(setDaySelected(day.valueOf()));
          dispatch(toggleEventModal());
        }}
      >
        {dayEvents.map((event, index) => (
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setSelectedEvent(event));
              dispatch(toggleEventModal());
            }}
            className={`${event.label} text-black p-1 mr-3 text-sm rounded mb-1 truncate font-bold`}
          >
            {/* { console.log(event.label)} */}

            {event.title}
          </div>
        ))}
      </div>
      <div className="cursor-pointer">{/*event list*/}</div>
    </div>
  );
};

export default Day;
