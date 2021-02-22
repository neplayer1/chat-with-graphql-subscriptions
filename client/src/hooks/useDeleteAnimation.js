import * as React from 'react';

export const useDeleteAnimation = (ref, opened) => {
  const setCustomTimeout = (callback, duration) => {
    const timeoutId = window.setTimeout(callback, duration);
    return () => window.clearTimeout(timeoutId);
  };
  React.useEffect(() => {
    const block = ref.current;
    console.log(block)
    if (block) {
      block.style.paddingTop = '';
      block.style.paddingBottom = '';
      const blockStyle = window.getComputedStyle(block);
      const oldPaddingTopStyle = blockStyle.paddingTop;
      const oldPaddingBottomStyle = blockStyle.paddingBottom;
      const oldPaddingTop = oldPaddingTopStyle ? +oldPaddingTopStyle.slice(0, -2) : 0;
      const oldPaddingBottom = oldPaddingBottomStyle ? +oldPaddingBottomStyle.slice(0, -2) : 0;
      // block.style.boxSizing = 'border-box';
      // block.style.paddingTop = 0 + 'px';
      // block.style.paddingBottom = 0 + 'px';
      console.log("dsds")
      if (opened) {
        block.style.opacity = 0;
        return setCustomTimeout(() => {
          block.style.marginTop = -1 * (block.scrollHeight + oldPaddingBottom + oldPaddingTop) + 'px';
        }, 250);
      }
    }

  }, [opened, ref]);
};
