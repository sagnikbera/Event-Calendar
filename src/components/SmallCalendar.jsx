import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import getMonth from '../utils/dayjs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSmallCalendarMonth, setDaySelected } from '../store/calendarSlice';

const SmallCalendar = () => {
  const [currMonIdx, setCurrMonIdx] = useState(dayjs().month());
  const [currMon, setCurrMon] = useState(getMonth());
  //from redux
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const daySelected = useSelector((state) => state.calendar.daySelected);

  const dispatch = useDispatch();

  useEffect(() => {
    //sync with big calender
    setCurrMonIdx(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrMon(getMonth(currMonIdx));
  }, [currMonIdx]);

  function handlePrevMon() {
    setCurrMonIdx(currMonIdx - 1);
  }
  function handleNextMon() {
    setCurrMonIdx(currMonIdx + 1);
  }

  const handleDayClick = (day) => {
    dispatch(setSmallCalendarMonth(currMonIdx));
    dispatch(setDaySelected(day.valueOf()));
  };

  const getDayClass = (day) => {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && dayjs(daySelected).format(format);

    if (nowDay === currDay) {
      return 'bg-blue-500 rounded-full text-white';
    }
    if (currDay === slcDay) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold';
    }
    return '';
  };

  return (
    <div className="mt-9">
      <header className="flex justify-between px-2">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currMonIdx)).format('MMMM YYYY')}
        </p>
        <div className="flex items-center ml-6 space-x-1">
          <button
            onClick={handlePrevMon}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group cursor-pointer"
          >
            <FaChevronLeft className="text-gray-500 group-hover:text-blue-600 text-sm" />
          </button>
          <button
            onClick={handleNextMon}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group cursor-pointer"
          >
            <FaChevronRight className="text-gray-500 group-hover:text-blue-600 text-sm" />
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 mt-2 p-2">
        {/* day  */}
        {currMon[0].map((day, i) => (
          <span key={i} className="text-sm font-bold text-center text-gray-700">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {/* date  */}
        {currMon.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, idx) => (
              <button
                key={idx}
                className="py-1 w-full"
                onClick={() => handleDayClick(day)}
              >
                <span
                  className={`text-sm py-1 px-1.5 transition-all ${getDayClass(day)}`}
                >
                  {day.format('D')}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
