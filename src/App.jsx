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
        <div className="flex flex-1 overflow-hidden">
          {showSidebar && <Sidebar />}
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
};

export default App;
