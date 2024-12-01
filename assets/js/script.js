'use strict';

import { listen, select } from './data/utility.js';
import { getResponse } from './ai/gemini.js';

const input = select('input');
const submitBtn = select('button');
const output = select('p');

listen(submitBtn, 'click', () => {
  let question = input.value;
  
  getResponse(question).then((response) => {
    output.innerText = response;
  });

  input.value = '';
});