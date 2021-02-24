import React, { useState } from 'react';
import { ChatListMessages } from './ChatListMessages';
import { ChatSendButton } from './ChatSendButton';

export const Chat = () => {
  const [name, setName] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="chat-container">
      <input
        className="chat-name-input"
        type="text"
        placeholder="Type name..."
        maxLength={10}
        value={name}
        onChange={(e) => handleChangeName(e)}
      />
      <ChatListMessages user={name} />
      <ChatSendButton user={name} />
    </div>
  );
};
