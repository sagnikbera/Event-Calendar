import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import getMonth from '../utils/dayjs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const SmallCalendar = () => {
  const [currMonIdx, setCurrMonIdx] = useState(dayjs().month());
  const [currMon, setCurrMon] = useState(getMonth());
  //from redux
  const monthIndex = useSelector((state) => state.calendar.monthIndex);

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
              <button key={idx} className="py-1 w-full">
                <span
                  className={`text-gray-600 ${day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-blue-500 rounded-full text-white py-1 px-1.5' : ''}`}
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
