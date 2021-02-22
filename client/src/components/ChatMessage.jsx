import React from "react";

export const ChatMessage = ({data, currentUser, onClick}) => {
  const {message, user} = data;
  const ownMessage = user === currentUser ? "own-message" : '';

  return (
      <div data-name={user} className={`chat-message ${ownMessage}`}>
        {message}
        <div className="chat-message__remove-btn" onClick={onClick}>x</div>
      </div>
  );
};
