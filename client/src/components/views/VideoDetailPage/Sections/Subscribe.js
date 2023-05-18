import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Subscribe({ userTo, userFrom }) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let subscribeVariable = { userTo: userTo };

   // Get subscriber count information
    axios
      .post('/api/subscribe/subscribeNumber', subscribeVariable)
      .then((response) => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('Failed to get subscriber count information.');
        }
      });

    let subscribedVariable = {
      userTo: userTo,
      userFrom: localStorage.getItem('userId'),
    };

    axios
      .post('/api/subscribe/subscribed', subscribedVariable)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert('Could not receive information.');
        }
      });
  }, []);

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: userTo,
      userFrom: userFrom,
    };

// if already subscribed
    if (Subscribed) {
      axios
        .post('/api/subscribe/unSubscribe', subscribeVariable)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert('Unsubscribe failed.');
          }
        });
    } else {
     // if not subscribed yet
      axios
        .post('/api/subscribe/subscribe', subscribeVariable)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert('Subscription failed.');
          }
        });
    }
  };

  return (
    <div>
      <SubscribeButton
        className={Subscribed ? 'subscribed-color' : ''}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'subscribing' : 'subscribe'}
      </SubscribeButton>
    </div>
  );
}

const SubscribeButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  text-transform: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  margin-left: 1.5rem;
  cursor: pointer;

  &.subscribed-color {
    background-color: #f2f2f2;
    color: #000;
  }
`;

export default Subscribe;
