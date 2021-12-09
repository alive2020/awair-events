import React from 'react';
import eventStyles from '../styles/Events.module.css';

function EventsList({ events }) {
  // console.log(events)
  return (
    <div >
      {events &&
        events.map((event, index) => (
          // <div>
          <h3 className={eventStyles.event} key={`${event.title}+ ${index}`}>
            {event.title}
            <span>{`Start: ${event.start}`}</span>
            <span>{`End: ${event.end}`}</span>
          </h3>
        ))}
    </div>
  );
}

export default EventsList;
