import React from 'react'
import Day from './Day'

const Month = ({month}) => {
  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5'>
      {month.map((week , wIdx) => (
        <React.Fragment key={wIdx}>
            {week.map((day , dIdx) => (
                <Day day={day} key={dIdx} rowIdx={wIdx}/>
            ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Month
