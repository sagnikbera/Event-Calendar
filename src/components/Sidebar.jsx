import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';

const Sidebar = () => {
  return (
    <aside className="border-r border-gray-500 p-5 w-80">
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
};

export default Sidebar;
