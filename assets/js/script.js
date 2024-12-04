'use strict';

import { listen, select, selectAll, style } from './data/utility.js';
import { getResponse } from './ai/gemini.js';

const aiTypeList = [
  'speak like my girlfriend', 'speak like my boyfriend', 
  'speak like a cowboy', 'speak like in the 80s'
];
const convertation = select('.chat-history');
const inputBox = select('.input-container');
const input = select('textarea');
const submitBtn = select('.fa-paper-plane');
const output = select('p');
const aiTypeBtns = selectAll('.icon-circle');
let typeAI = '';

listen(submitBtn, 'click', () => {
  if (validation()) {
    let question = input.value;
    newMessage(true, question);
    input.value = '';
    validation();
    style(input, 'height', 'auto');

    getResponse(question, typeAI).then((response) => { 
      newMessage(false, response);
    });
  }
});

listen(input, 'input', () => {
  style(input, 'height', 'auto');
  let newHeight = `${input.scrollHeight}px`;
  style(input, 'height', newHeight);
  validation();
});

aiTypeBtns.forEach((type, index) => {
  listen(type, 'click', ()=> {
    typeAI = aiTypeList[index];
    convertation.innerHTML = '';

    getResponse('say hello to me', typeAI).then((response) => { 
      newMessage(false, response);
    });
  });
}); 

function newMessage(isUser, response) {
  const paragraph = document.createElement('p');
  const icon = document.createElement('div');
  const container = document.createElement('div');

  addAttributes(isUser, response, paragraph, icon, container);
  convertation.appendChild(container);
}

function addAttributes(isUser, response, paragraph, icon, container) {
  icon.classList.add('icon');
  paragraph.innerText = response.trim();

  if (isUser) {
    container.classList.add('user-respond');
    icon.classList.add('user-icon');

    container.appendChild(paragraph);
    container.appendChild(icon);
  } else {
    container.classList.add('ai-respond');
    icon.classList.add('ai-icon');
    icon.innerText = 'AI';

    container.appendChild(icon);
    container.appendChild(paragraph);
  }
  
}

function validation() {
  if (input.value === '') {
    style(submitBtn, 'color', '#ffffff4b');
    style(submitBtn, 'cursor', 'default');
    return false;
  }

  style(submitBtn, 'cursor', 'pointer');
  style(submitBtn, 'color', '#fff');
  return true;
}
