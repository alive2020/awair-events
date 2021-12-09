import React from 'react';
import eventStyles from '../styles/Events.module.css';

function EventsList({ events, handleDelete }) {
  return (
    <div>
      {events &&
        events.map((event, index) => (
          <div className={eventStyles.event} key={`${event.title}+ ${index}`}>
            <h3>{event.title?.length > 1 ? event.title : '*no title*'}</h3>
            <p>{`Start: ${event.start}`}</p>
            <p>{`End: ${event.end}`}</p>

            <button
              className={eventStyles.deleteBtn}
              onClick={() => handleDelete(event.title)}
            >
              delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default EventsList;
