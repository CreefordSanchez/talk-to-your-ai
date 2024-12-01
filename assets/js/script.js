'use strict';

import { listen, select } from './data/utility.js';
import { getResponse } from './ai/gemini.js';

const input = select('textarea');
const submitBtn = select('fa-paper-plane');
const output = select('p');
let isValid = false;

listen(submitBtn, 'click', () => {

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
  
  isValid = validation();
});

function validation() {
  if (input.value === '') return false; 
  return true;
}