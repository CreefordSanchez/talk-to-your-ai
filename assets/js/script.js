'use strict';

import { listener, selector } from './data/utility.js';
import { getResponse } from './ai/gemini.js';

const input = selector('input');
const submitBtn = selector('button');
const output = selector('p');

listener(submitBtn, 'click', () => {
  let question = input.value;
  
  getResponse(question).then((response) => {
    output.innerText = response;
  });

  input.value = '';
});