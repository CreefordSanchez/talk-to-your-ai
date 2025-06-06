'use strict';

import { listen, select, selectAll, style } from './data/utility.js';
import { getResponse } from './ai/gemini.js';
import { errorLine } from './form.js';

/*******************************************************************************
Comunication with AI console
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
let currentId = '';

listen(submitBtn, 'click', () => {
  updateSave(currentId);
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
  listHistory();
});

aiTypeBtns.forEach(btn => {
  listen(btn, 'click', ()=> {
    updateSave(currentId);
    const convertation = select('.chat-history');

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
  const convertation = select('.chat-history');

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
 
/*******************************************************************************
floating screen errorLine
*******************************************************************************/
const screenContainer = select('.floating-screen-container');
const floatingScreen = select('.floating-screen');

listen(screenContainer, 'click', function(event) {
  const child = floatingScreen.getBoundingClientRect();

  if (
    event.clientY < child.top || event.clientY > child.bottom || 
    event.clientX < child.left || event.clientX > child.right
  ) {
    style(screenContainer, 'display', 'none');
  }
});

/*******************************************************************************
Save History
*******************************************************************************/
const chatContainer = select('.convertation');
const appearSaveBtn = select('.save-btn');
const saveName = select('.chat-name');
const submitSave = select('.save');
const historyList = select('.history-list');
let willDelete = false;

listen(appearSaveBtn, 'click', () => {
  style(screenContainer, 'display', 'flex');
});

listen(submitSave, 'click', () => {
  if(validateSaveName()) {
    saveNewChat();
    saveName.value = '';
    style(screenContainer, 'display', 'none');
  }
});

function deleteSaveBtns() {
  const deleteSave = selectAll('.chat-info button');

  deleteSave.forEach(deleteBtn => {
    listen(deleteBtn, 'click', () => {
      sessionStorage.removeItem(deleteBtn.value);
      willDelete = true;
      listHistory();
    }); 
  })
}

function updateSave(id) {
  if (id != '') {
    const chatInfo = getChatContent(id);
    chatInfo.currentChat = chatContainer.innerHTML;
    sessionStorage.setItem(id, JSON.stringify(chatInfo));
  }

  id = '';
}

function chatSavedBtns() {
  const historyArr = Array.from(historyList.children);
  
  historyArr.forEach(chat => {
    listen(chat, 'click', () => {
      if (!willDelete) {
        chatContainer.innerHTML = '';
        getSavedChat(chat);
      } else {
        willDelete = true;
      }
    });
  });
}

function getSavedChat(container) {
  currentId = container.id;
  const chatInfo = getChatContent(currentId);
  chatContainer.innerHTML = chatInfo.currentChat;
  typeAI = chatInfo.version;
}

function validateSaveName() {
  let name = saveName.value;

  if (name === '') {
    errorLine(saveName, true);
    return false;
  }

  errorLine(saveName, false);
  return true;
}

function saveNewChat() {
  const newSave = { 
    currentChat: chatContainer.innerHTML, 
    version: typeAI,
    chatName: saveName.value
  };

  let id = new Date;
  sessionStorage.setItem(id.getTime(), JSON.stringify(newSave));

  listHistory();
}

function listHistory() {
  historyList.innerHTML = '';

  if (sessionStorage.length > 0) {
    for (let i = 0; i < sessionStorage.length; i++) {
      let id = sessionStorage.key(i);    
      const chat = getChatContent(id);
      setChatInfo(chat, id);
      deleteSaveBtns();
      chatSavedBtns(); 
    }
  } else {
    historyList.innerHTML = '<p>No chat saved</p>';
  }  
}

function getChatContent(id) {
  let placeholder = sessionStorage.getItem(id);
  const chatInfo = JSON.parse(placeholder);

  return chatInfo;
}

function setChatInfo(chatInfo, id) {
  const container = document.createElement('div');
  const printName = document.createElement('h2');
  const deleteBtn = document.createElement('button');
  const trashIcon = document.createElement('i');

  printName.innerText = chatInfo.chatName;
  deleteBtn.value = id;

  giveAtributes(container, printName, deleteBtn, trashIcon, id);
}

function giveAtributes(container, printName, deleteBtn, trashIcon, id) {
  trashIcon.classList.add('fa-solid', 'fa-trash', 'delete');
  container.classList.add('chat-info');
  container.id = id;

  deleteBtn.append(trashIcon);
  container.append(printName, deleteBtn);

  historyList.appendChild(container);
}