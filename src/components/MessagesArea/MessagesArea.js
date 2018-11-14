import React from 'react';
import './MessagesArea.css';

const MessagesArea = ({ challenge: {id, title, messages}, avatar }) => {
  return (
    <div className="messagesArea">
      <ul>{orderedMessages(messages, avatar)}</ul>
    </div>
  )
}

export default MessagesArea;

const orderedMessages = (messages, avatar) => {
  const sortedMessages = messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

  return sortedMessages.map(message => {
    return <li key={message.id}><span className={message.avatar_id === avatar.id ? "speaker" : "target"}>[{message.speaker}] </span>{message.text}</li>
  })
}