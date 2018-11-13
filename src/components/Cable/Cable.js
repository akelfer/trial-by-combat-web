import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ challenges, handleReceivedMessage }) => {
  return (
    <Fragment>
      {challenges.map(challenge => {
        return (
          <ActionCable
            key={challenge.id}  
            channel={{ channel: 'MessagesChannel', challenge: challenge.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;