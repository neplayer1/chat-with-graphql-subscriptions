import React from 'react';

export const useTransitionCallback = () => {
  const onExit = (node) => {
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
  return {onExit};
};
