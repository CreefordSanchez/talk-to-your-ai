'use strict';

import { listen, select, selectAll, style } from './data/utility.js';
//prevent reload when submit
const form = selectAll('form');
form.forEach(form => {
  listen(form, 'click', (event) => {
    event.preventDefault();
  });
});

/*******************************************************************************
floating screen
*******************************************************************************/
const screenContainer = select('.floating-screen-container');
const floatingScreen = select('.floating-screen');
const screenArr = Array.from(floatingScreen.children);

listen(screenContainer, 'click', function(event) {
  const child = floatingScreen.getBoundingClientRect();

  if (
    event.clientY < child.top || event.clientY > child.bottom || 
    event.clientX < child.left || event.clientX > child.right
  ) {
    style(screenContainer, 'display', 'none');
  }
});

export function errorLine(selector, bool) {
  if (bool) {
    let redLine = '2px solid #ff0000'
    style(selector, 'border', redLine);
  } else {
    let removeLine = '2px solid #141414'
    style(selector, 'border', removeLine);
  }
}
