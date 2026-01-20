import React from 'react';
import { IoCalendarSharp } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CalendarHeader = () => {
  return (
    <header className="px-4 py-3 flex items-center border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center">
        <IoCalendarSharp className="text-4xl text-blue-600" />
        <h1 className="ml-2 text-2xl font-bold text-gray-700 tracking-tight">
          X-Calendar
        </h1>
      </div>

      {/* Nav */}
      <div className="flex items-center ml-12">
        <button 
          className="border rounded-2xl py-1.5 px-4 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer"
        >
          Today
        </button>

        <div className="flex items-center ml-6 space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <FaChevronLeft className="text-gray-600 group-hover:text-blue-600 text-sm" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <FaChevronRight className="text-gray-600 group-hover:text-blue-600 text-sm" />
          </button>
        </div>

        {/* Current Month/Year  */}
        <h2 className="ml-6 text-xl font-semibold text-gray-700">
          January 2026
        </h2>
      </div>

      
      {/* <div className="ml-auto">
      </div> */}
    </header>
  );
};

export default CalendarHeader;