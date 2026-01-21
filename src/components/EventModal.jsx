import React, { useEffect, useState } from 'react';
import { MdDragHandle } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEvent,
  pushEvent,
  toggleEventModal,
  updateEvent,
} from '../store/calendarSlice';
import { MdOutlineSchedule } from 'react-icons/md';
import { RiMenu3Fill } from 'react-icons/ri';
import { FaRegBookmark } from 'react-icons/fa';
import dayjs from 'dayjs';
import { SiTicktick } from 'react-icons/si';
import { MdDelete } from 'react-icons/md';
import { MdLabelOutline } from 'react-icons/md';

const labelsClasses = [
  'bg-indigo-400',
  'bg-gray-500',
  'bg-green-600',
  'bg-blue-400',
  'bg-red-400',
  'bg-purple-500',
  'bg-amber-500',
];

const EventModal = () => {
  const selectedEvent = useSelector((state) => state.calendar.selectedEvent);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTagsList] = useState([]);

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : labelsClasses[0]
  );
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const daySelected = useSelector((state) => state.calendar.daySelected);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedEvent) {
      setTagsList(selectedEvent.tags || []);
      setSelectedLabel(selectedEvent.label);
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
    } else {
      setTagsList([]);
      setSelectedLabel(labelsClasses[0]);
      setTitle('');
      setDescription('');
    }
  }, [selectedEvent]);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTagsList([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const calendarEvent = {
      title: title,
      description: description,
      label: selectedLabel,
      tags: [...tags],
      day: selectedEvent ? selectedEvent.day : daySelected,
      id: selectedEvent ? selectedEvent.id : Date.now(), // in case of edit id should be same
    };

    if (selectedEvent) {
      dispatch(updateEvent(calendarEvent));
    } else {
      dispatch(pushEvent(calendarEvent));
    }

    dispatch(toggleEventModal());
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50 bg-black/50">
      <form className="rounded-lg shadow-2xl w-1/4  bg-white">
        <header className="bg-gray px-4 py-2 flex justify-between items-center">
          {selectedEvent && (
            <span
              onClick={() => {
                dispatch(deleteEvent(selectedEvent));
                dispatch(toggleEventModal());
              }}
            >
              <MdDelete className="text-2xl" />
            </span>
          )}
          <span>
            <MdDragHandle className="text-2xl" />
          </span>
          <button type="button" onClick={() => dispatch(toggleEventModal())}>
            <MdClose className="text-2xl" />
          </button>
        </header>
        <div className="p-6">
          <div className="grid grid-cols-[1fr_5fr] items-end gap-y-7">
            {/* title  */}
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* schedule */}
            <MdOutlineSchedule className="text-gray-500 text-2xl justify-self-center" />
            <p className="text-gray-600 font-medium">
              {dayjs(daySelected).format('dddd, MMMM DD')}
            </p>

            {/* description */}
            <RiMenu3Fill className="text-gray-500 text-2xl justify-self-center" />
            <input
              type="text"
              placeholder="Add a description"
              className="pt-1 font-semibold border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* tag  */}
            <MdLabelOutline className="text-gray-500 text-2xl justify-self-center" />
            <div>
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() =>
                        setTagsList(tags.filter((tag) => tag !== t))
                      }
                      className="ml-1 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tags (press Enter)"
                className="pt-1 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
            {/* labels */}
            <FaRegBookmark className="text-gray-500 text-2xl justify-self-center" />
            <div className="flex gap-x-2">
              {/* <span className="w-6 h-6 bg-blue-500 rounded-full cursor-pointer"></span> */}
              {labelsClasses.map((col, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(col)}
                  className={`w-6 h-6 ${col} rounded-full cursor-pointer`}
                >
                  {selectedLabel === col && (
                    <SiTicktick className="text-gray text-2xl mx-auto" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - save btn */}
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-3xl text-white font-bold"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
