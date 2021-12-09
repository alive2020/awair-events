import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NewEvent from '../components/NewEvent';
import EventsList from '../components/EventsList';
import eventStyles from '../styles/Events.module.css';

function Events({ events, error, handle }) {
  const [err, setErr] = useState(error);
  const [eve, setEve] = useState(events);
  const [tokens, setTokens] = useState([events?.next_page_token]);
  const [page, setPage] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => setErr(null), 1000);
      // setTimeout(() => console.log('asdasdas'), 1000);
    }
  }, []);

  const handleNexPage = async (type) => {
    const url =
      page === 1 && type === 'prev'
        ? 'https://mobile-app-interview.awair.is/events'
        : `https://mobile-app-interview.awair.is/events?next_page_token=${
            type === 'next' ? tokens[page] : tokens[page - 2]
          }`;
    await fetch(url)
      .then(async (res) => {
        if (res.status === 200) {
          setErr(null);
          const response = await res.json();
          setEve(response);
          if (
            tokens.filter((item) => item === response.next_page_token)
              .length === 0
          )
            setTokens([...tokens, response.next_page_token]);
          setPage(type === 'prev' ? page - 1 : page + 1);
        } else {
          setErr(await res.json());
        }
      })
      .catch((e) => {
        setEve([]);

        console.log('inside client error', e);
      });
  };

  const openPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(!isPopupOpen);
  };
  return (
    <div className={eventStyles.container}>
      <Head>
        <title>Events</title>
        <meta name='keywords' content='events, work-life balance' />
      </Head>
      {/* {err && (
        <div className='error'>
          <p>{err?.error}</p>
          <p>Please reload this page!</p>
        </div>
      )} */}
      <button className={eventStyles.newEventBtn} onClick={openPopup}>{isPopupOpen ? 'Close' : 'New Event'}</button>
      {isPopupOpen && (
        <NewEvent setIsPopupOpen={setIsPopupOpen}
          events={(val) => setEve({ ...eve, events: [...eve.events, val] })}
        />
      )}
      <h1 className={eventStyles.eventsTitle}>Our Events</h1>
      <EventsList
        events={eve?.events}
        handleDelete={(val) =>
          setEve({
            ...eve,
            events: eve.events.filter((item) => item.title !== val),
          })
        }
      />
      <div className={eventStyles.btns}>
        {page != 0 && (
          <button onClick={() => handleNexPage('prev')}>Prev Page</button>
        )}
        <button onClick={() => handleNexPage('next')}>Next Page</button>
      </div>
      {err && <p className={eventStyles.error}>{err?.error}. Please try again!</p>}
    </div>
  );
}

export const getStaticProps = async () => {
  let events = [];
  let error = null;

  await fetch('https://mobile-app-interview.awair.is/events')
    .then(async (res) => {
      if (res.status === 200) {
        events = await res.json();
      } else {
        error = await res.json();
      }
    })
    .catch((e) => console.log(e, 'error'));

  return {
    props: {
      events,
      error,
    },
  };
};

export default Events;
