# X-Calendar 📅

X-Calendar is a modern, responsive, and feature-rich calendar application built with **React**, **Redux Toolkit**, and **Tailwind CSS**. It is inspired by the clean and intuitive user interface of Google Calendar.

## ✨ Features

- **Monthly View:** A beautiful 5x7 grid layout to view all your events for the month at a glance.
- **Event Management (CRUD):** Seamlessly create, edit, and delete events.
- **Tag & Label System:** Categorize events using color-coded labels and custom text tags.
- **Smart Filtering:** Filter the calendar display by toggling specific labels or tags in the sidebar.
- **Mini Calendar:** Quick navigation through months using the synchronized sidebar calendar.
- **Local Storage Support:** Persistent data storage ensures your events and preferences are saved even after page refreshes.
- **Fully Responsive:** Optimized for all devices—mobile, tablet, and desktop—using adaptive layouts.

## 🛠 Tech Stack

- **Frontend:** [React.js](https://reactjs.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Date Manipulation:** [Day.js](https://day.js.org/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/sagnikbera/X-Calendar.git](https://github.com/sagnikbera/X-Calendar.git)
cd x-calendar
```

### 2. Install dependencies

```
npm install
```

### 3. Run the application

```
npm start
```

## 📂 Project Structure

## 📂 Project Structure

````text
X-Calendar/
├── public/              # Static assets (index.html, favicon)
├── src/
│   ├── components/      # UI Components
│   │   ├── CalendarHeader.jsx
│   │   ├── Day.jsx
│   │   ├── EventModal.jsx
│   │   ├── Labels.jsx
│   │   ├── Month.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SmallCalendar.jsx
│   │   └── Tag.jsx
│   ├── store/           # Redux logic
│   │   ├── calendarSlice.js
│   │   └── store.js
│   ├── utils/           # Helper functions
│   │   └── dayjs.js
│   ├── App.jsx          # Main App component
│   ├── index.css        # Tailwind & global styles
│   └── main.jsx         # React entry point
├── package.json         # Dependencies & scripts
├── tailwind.config.js   # Tailwind configuration
└── README.md            # Documentation


## 📂 Logic : dayjs

```js
// src/utils/dayjs.js
import dayjs from 'dayjs';

export default function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 0 - firstDayOfTheMonth;

  // Create a 2D array: 5 rows (weeks) x 7 columns (days)
  const dayMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return dayMatrix;
}
````

# X-Calendar 📅

[![Live Demo](https://img.shields.io/badge/demo-live-blue.svg)](https://x-event-cal.vercel.app/)
[![YouTube Video](https://img.shields.io/badge/youtube-demo-red.svg)](https://youtu.be/ha_NwtbQAbI)
