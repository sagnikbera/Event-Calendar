import React from 'react';
import { IoCalendarSharp } from 'react-icons/io5';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setMonthIndex, toggleSidebar } from '../store/calendarSlice';
import { GiHamburgerMenu } from 'react-icons/gi';
import dayjs from 'dayjs';

const CalendarHeader = () => {
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const dispatch = useDispatch();

  const handlePrevMonth = () => {
    dispatch(setMonthIndex(monthIndex - 1));
  };
  const handleNextvMonth = () => {
    dispatch(setMonthIndex(monthIndex + 1));
  };

  const handleReset = () => {
    dispatch(setMonthIndex(dayjs().month()));
  };
  return (
    <header className="px-4 py-3 flex items-center border-b border-gray-200 sticky top-0 bg-white z-20">
      {/* hamburger  */}
      <GiHamburgerMenu
        className="text-2xl text-gray-600 mr-2 cursor-pointer"
        onClick={() => dispatch(toggleSidebar())}
      />
      {/* Logo */}
      <div className="flex items-center">
        <IoCalendarSharp className="text-3xl md:text-4xl text-blue-600" />

        <h1 className="ml-2 text-xl md:text-2xl font-bold text-gray-700 tracking-tight hidden sm:block">
          X-Calendar
        </h1>
        <h1 className="ml-1 text-xl font-bold text-gray-700 sm:hidden">
          X-Cal
        </h1>
      </div>

      {/* Nav */}

      <div className="flex items-center ml-4 md:ml-12">
        <button
          onClick={handleReset}
          className="border rounded-2xl py-1 px-3 md:py-1.5 md:px-4 text-xs md:text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer transition-all"
        >
          Today
        </button>

        <div className="flex items-center ml-2 md:ml-6 space-x-1 md:space-x-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors group cursor-pointer"
          >
            <FaChevronLeft className="text-gray-600 group-hover:text-blue-600 text-base md:text-lg" />
          </button>
          <button
            onClick={handleNextvMonth}
            className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors group cursor-pointer"
          >
            <FaChevronRight className="text-gray-600 group-hover:text-blue-600 text-base md:text-lg" />
          </button>
        </div>

        {/* Current Month/Year  */}
        <h2 className="ml-3 md:ml-6 text-sm md:text-xl font-semibold text-gray-700 whitespace-nowrap">
          {dayjs(new Date(dayjs().year(), monthIndex)).format('MMM YYYY')}
        </h2>
      </div>

      {/* <div className="ml-auto">
      </div> */}
    </header>
  );
};

export default CalendarHeader;
