import React, { useEffect, useState } from 'react';
import getMonth from './utils/dayjs';
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import EventModal from './components/EventModal';
import { useSelector, useDispatch } from 'react-redux';
import { setLabels, setTags } from './store/calendarSlice';

const App = () => {
  // console.table(getMonth());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const dispatch = useDispatch();

  const showSidebar = useSelector((state) => state.calendar.showSidebar);
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const showEventModal = useSelector((state) => state.calendar.showEventModal);
  const savedEvents = useSelector((state) => state.calendar.savedEvents);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    dispatch(setLabels());
    dispatch(setTags());
  }, [savedEvents, dispatch]);

  return (
    <>
      <div className="h-screen flex flex-col">
        {showEventModal && <EventModal />}
        <CalendarHeader />
        {/* পরিবর্তন: 'flex-col md:flex-row' যোগ করা হয়েছে যাতে মোবাইলে সাইডবার উপরে থাকে এবং বড় স্ক্রিনে পাশে থাকে */}
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          {/* পরিবর্তন: সাইডবার মোবাইলে ফুল উইডথ হবে এবং বড় স্ক্রিনে নির্দিষ্ট উইডথ পাবে */}
          {showSidebar && (
            <div className="w-full md:w-auto h-auto md:h-full overflow-y-auto">
              <Sidebar />
            </div>
          )}
          <div className="flex-1 overflow-auto">
            <Month month={currentMonth} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
