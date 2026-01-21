import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import Labels from './Labels';
import Tags from './Tag';

const Sidebar = () => {
  return (
    <aside className="border-b md:border-b-0 md:border-r border-gray-400 p-5 w-full md:w-80 h-full overflow-y-auto">
      <div className="flex flex-col gap-y-4">
        <CreateEventButton />
        <SmallCalendar />
        <Labels />
        <Tags />
      </div>
    </aside>
  );
};

export default Sidebar;
