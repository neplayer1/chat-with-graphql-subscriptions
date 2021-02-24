import React, { useCallback, useState } from 'react';
import { useMutation, useSubscription } from 'graphql-hooks';
import { SUBSCRIBE_MESSAGES } from '../queries/subscriptions';
import { ChatMessage } from './ChatMessage';
import { DELETE_MESSAGE } from '../queries/mutations';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const ChatListMessages = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useSubscription({ query: SUBSCRIBE_MESSAGES }, ({ data, errors }) => {
    if (errors?.length > 0) {
      console.log(errors[0]);
      return;
    }
    setMessages(data.messages);
  });
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const handleDeleteMessage = useCallback(
    async (id) => {
      await deleteMessage({
        variables: {
          id,
        },
      });
    },
    [deleteMessage]
  );

  const calculateMarginTop = (node) => {
    const blockStyle = window.getComputedStyle(node);
    const oldBorderTopStyle = blockStyle.borderTopWidth;
    const oldBorderTop = oldBorderTopStyle
      ? +oldBorderTopStyle.slice(0, -2)
      : 0;

    if (
      node.dataset.name !== node.previousSibling?.dataset.name &&
      node.nextSibling
    ) {
      node.style.marginTop = -1 * node.scrollHeight + 'px';
    } else {
      node.style.marginTop = -1 * (node.scrollHeight + oldBorderTop) + 'px';
    }
  };

  return (
    <div className="chat-list-messages">
      <TransitionGroup component={null}>
        {messages &&
          messages.map((item) => (
            <CSSTransition
              key={item.id}
              timeout={400}
              classNames="fade-in-out"
              onExit={(node) => calculateMarginTop(node)}
            >
              <ChatMessage
                data={item}
                currentUser={user}
                onClick={() => handleDeleteMessage(item.id)}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};
