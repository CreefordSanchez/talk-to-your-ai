'use strict';

import { listen, select, selectAll, style } from './data/utility.js';

const submitBtn = select('.submit');
const appearBtn = select('.contact-btn');
const contactContainer = select('.contact-form');
const contactBox = select('.contact-me');

//Inputs
const firstName = select('.first-name');
const lastName = select('.last-name');
const email = select('.email');
const message = select('.message');
const inputList = [firstName, lastName, email, message];

listen(contactContainer, 'click', function(event) {
  const child = contactBox.getBoundingClientRect();

  if (
    event.clientY < child.top || event.clientY > child.bottom || 
    event.clientX < child.left || event.clientX > child.right
  ) {
    style(contactContainer, 'display', 'none');
  }
});

listen(appearBtn, 'click', () => {  
  style(contactContainer, 'display', 'flex');
});

listen(submitBtn, 'click', () => {
  if (validation()) {
    style(contactContainer, 'display', 'none');
  }
});

function newUser(firstName, lastName, email, message) {
  const user = {
    firstName: firstName, lastName: lastName,
    email: email, message: message
  }

  return user;
}

function validation() {
  const user = newUser(
    firstName.value, lastName.value, email.value, message.value
  );
  let isValid = true;
  if (isNotEmpty(user)) {
    const checkValidation = [];
  }

  return false;
}

function isNotEmpty(user) {
  const userKeys = Object.keys(user);
  let valid = true;

  userKeys.forEach((key, index) => {
    if (user[key] === '') {
      valid = false;
      let redLine = '1px solid #ff0000'
      style(inputList[index], 'border', redLine);
    } else {      
      let removeLine = '1px solid #141414'
      style(inputList[index], 'border', removeLine);
    }
  });

  return valid;
}

function isNameValid(user) {
  
}
