import React, { useState } from 'react';
import eventStyles from '../styles/Events.module.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewEvent({ events, setIsPopupOpen }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAdd = () => {
    let body = {
      title: title,
      start: startDate,
      end: endDate,
    };
    events(body);

    setTitle('');
    setStartDate('');
    setEndDate('');

    setIsPopupOpen(false);
 
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
