import React from 'react';

function EventsList({events}) {
    console.log(events)
  return (
    <div>
        {events && events.map((event, index) => 
        // <div>
        <h3 key={`${event.title}+ ${index}`}>{event.title}</h3>
       
        )}
        </div>
  );
}

export default EventsList;
