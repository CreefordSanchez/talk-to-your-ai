'use strict';

import { listen, select, selectAll, style } from './data/utility.js';
import { getResponse } from './ai/gemini.js';


/*******************************************************************************
Comunication with AI
*******************************************************************************/
const aiVersions = { 
  Girlfriend: 'speak like my girlfriend', Boyfriend: 'speak like my boyfriend',
  Cowboy: 'speak like a cowboy', BeachBoy: 'speak like in the 80s'
}
const aiTypeList = Object.values(aiVersions);
const aiVersionName = Object.keys(aiVersions);
const printVersion = select('.print-version');
const convertation = select('.chat-history');
const input = select('textarea');
const submitBtn = select('.fa-paper-plane');
const aiTypeBtns = selectAll('.icon-circle');
let typeAI = 'BeachBoy';

listen(submitBtn, 'click', () => {
  if (validation()) {
    let question = input.value;
    input.value = '';

    newMessage(true, question);
    validation();
    style(input, 'height', 'auto');
    geminiAI(false, question);
  }
});

listen(input, 'input', () => {
  style(input, 'height', 'auto');
  let newHeight = `${input.scrollHeight}px`;
  style(input, 'height', newHeight);
  validation();
});

listen(window, 'load', () => {
  printVersion.innerText = `Beachboy version`;
  geminiAI(false, 'say hello to me');
});

aiTypeBtns.forEach(btn => {
  listen(btn, 'click', ()=> {
    typeAI = btn.value;
    convertation.innerHTML = '';
    
    printVersion.innerText = `${typeAI} version`;
    geminiAI(false, 'say hello to me');
  });
}); 

function geminiAI(isUser, question) {
  getResponse(question, typeAI).then((response) => { 
    newMessage(isUser, response);
  });
}

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

/*******************************************************************************
Navigation tab
*******************************************************************************/
const expandBtn = selectAll('.expand');
const menuTab = select('.menu-tab');
const showInfo = selectAll('.fa-angle-down');
const description = selectAll('.description');

expandBtn.forEach(btn => {
  listen(btn, 'click', () => {
    menuTab.classList.toggle('show-tab');
  });
});

showInfo.forEach((btn, index) => {
  listen(btn, 'click', () => {
    description[index].classList.toggle('display-inline');
  });
});
/*
aiTypeBtns.forEach(btn => {
  listen(btn, 'click', ()=> {    
    style(menuTab, 'left', '-100vw');
  });
});*/