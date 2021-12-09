import React from 'react';
import eventStyles from '../styles/Events.module.css';

function EventsList({ events, handleDelete }) {
  console.log(events);
  return (
    <div>
      {events &&
        events.map((event, index) => (
          <div>
            <h3 className={eventStyles.event} key={`${event.title}+ ${index}`}>
              {event.title}
            </h3>
            <span>{`Start: ${event.start}`}</span>
            <span>{`End: ${event.end}`}</span>
            <button onClick={() => handleDelete(event.title)}>delete</button>
          </div>
        ))}
    </div>
  );
}

export default EventsList;
