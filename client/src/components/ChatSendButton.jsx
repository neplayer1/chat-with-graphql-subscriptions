import React, { useCallback, useRef, useState } from 'react';
import { useMutation } from 'graphql-hooks';
import { ADD_MESSAGE } from '../queries/mutations';

export const ChatSendButton = ({ user }) => {
  const [message, setMessage] = useState('');
  const msgInput = useRef(null);
  const [addMessage] = useMutation(ADD_MESSAGE);

  const handleAddMessage = useCallback(async () => {
    if (message && user) {
      const newMessage = {
        variables: { message, user },
      };
      await addMessage(newMessage);
      setMessage('');
      msgInput.current.focus();
    }
  }, [addMessage, message, user]);

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      handleAddMessage();
    }
  };

  return (
    <>
      <div className="chat-textarea">
        <div className="expandingArea">
          <textarea
            ref={msgInput}
            placeholder="Type message..."
            value={message}
            onChange={(e) => handleChangeMessage(e)}
            onKeyDown={(e) => handleSendMessage(e)}
          />
          <pre>
            <span>{message}</span>
            <br />
          </pre>
        </div>
      </div>
      <button className="chat-button" onClick={handleAddMessage}>
        Send
      </button>
    </>
  );
};
