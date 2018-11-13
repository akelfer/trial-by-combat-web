import React from 'react';
import MessageForm from '../MessageForm/MessageForm';

const MessagesArea = ({ challenge: {id, title, messages} }) => {
  return (
    <div className="messagesArea">
      <h5>{title}</h5>
      <ul>{orderedMessages(messages)}</ul>
      <MessageForm challenge_id={id} />
    </div>
  )
}

export default MessagesArea;

const orderedMessages = messages => {
  const sortedMessages = messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

  return sortedMessages.map(message => {
    return <li key={message.id}>{message.text}</li>
  })
}