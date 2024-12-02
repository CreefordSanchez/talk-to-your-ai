'use strict';

import { listen, select, style } from './data/utility.js';
import { getResponse } from './ai/gemini.js';

const container = select('.convertation');
const input = select('textarea');
const submitBtn = select('.fa-paper-plane');
const output = select('p');

listen(submitBtn, 'click', () => {
  newMessage(true, input.value);
  /*let question = input.value;
  
  getResponse(question).then((response) => {
    output.innerText = response;
  });

  input.value = '';*/
});

listen(input, 'input', () => {
  style(input, 'height', 'auto');
  let newHeight = `${input.scrollHeight}px`;
  style(input, 'height', newHeight);
  console.log(newHeight);
  validation();
});



function validation() {
  if (input.value === '') {
    style(submitBtn, 'color', '#ffffff4b');
    return false;
  }

  style(submitBtn, 'color', '#fff');
  return true;
}

