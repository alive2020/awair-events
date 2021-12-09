import React, { useState } from 'react';
import eventStyles from '../styles/Events.module.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewEvent({ events }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //   console.log(JSON.stringify(startDate));
  const handleAdd = () => {
    let body = {
      title: title,
      start: startDate,
      end: endDate,
    };
    events(body);
    // fetch('https://mobile-app-interview.awair.is/events', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ title: title, start: startDate, end: endDate }),
    // })
    //   .then(() => se)
  };
  return (
    <div className={eventStyles.newEventContainer}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type='text'
        placeholder='Add new event'
      />
      <div className={eventStyles.datePicker}>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText='Start Date'
        />
        <ReactDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText='End Date'
        />
      </div>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default NewEvent;
