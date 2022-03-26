import React, { useState } from 'react';
import eventStyles from '../styles/Events.module.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {addTodo} from '../redux/todo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function NewEvent({ events, setIsPopupOpen, dispatch }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAdd = () => {
    let body = {
      title: title,
      start: startDate,
      end: endDate,
    };
    dispatch(addTodo(body))
    // events(body);

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

NewEvent.propTypes = {dispatch: PropTypes.func.isRequired, }

export default connect()(NewEvent);
