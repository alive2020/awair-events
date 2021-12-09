import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import EventsList from '../components/EventsList';

function Events({ events, error }) {
  const [err, setErr] = useState(error);

  useEffect(() => {
    if (error) {
      setTimeout(() => setErr(null), 3000);
      // setTimeout(() => console.log('asdasdas'), 1000);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name='keywords' content='events, work-life balance' />
      </Head>
      {err && (
        <div className='error'>
          <p>{err?.error}</p>
          <p>Please reload this page!</p>
        </div>
      )}
      <h1>Our Events</h1>
      <EventsList events={events?.events} />
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
    .catch((e) => console.log(e, ' eror'));

  return {
    props: {
      events,
      error,
    },
  };
};

export default Events;
