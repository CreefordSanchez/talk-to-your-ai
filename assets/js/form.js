'use strict';

import { listen, select, selectAll, style } from './data/utility.js';

const submitBtn = select('.submit');
const appearBtn = select('.contact-btn');
const contactContainer = select('.contact-form');
const contactBox = select('.contact-me');

// Error outputs
const firstNameError = select('.first-name-error');
const lastNameError = select('.last-name-error');
const emailError = select('.email-error');
const messageError = select('.message-error');

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

  if (isNotEmpty(user)) {
    const checkValidation = [
      isNameValid(user), isEmailValid(user), isMessageValid(user)
    ];
    if (checkValidation.includes(false)) return false;
    return true;
  }

  return false;
}

function isNotEmpty(user) {
  const userKeys = Object.keys(user);
  let valid = true;

  userKeys.forEach((key, index) => {
    if (user[key] === '') {
      valid = false;
      errorLine(inputList[index], true);

    } else {      
      errorLine(inputList[index], false);
    }
  });

  return valid;
}

function isNameValid(user) {
  let isValid = true;
  if (user.firstName === 0) {
    errorLine(firstName, true);
    isValid = false;
    firstNameError.innerText = 'Enter a FirstName'

  } else {
    errorLine(firstName, false);
    firstNameError.innerText = '';
  }

  if (user.lastName.length === 0) {
    errorLine(lastName, true);    
    isValid = false;
    lastNameError.innerText = 'Enter a LastName';

  } else {
    errorLine(lastName, false);
    lastNameError.innerText = '';
  }

  return isValid;
}

function isEmailValid(user) {
  let requirements = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(co|com)$/;

  if (requirements.test(user.email)) {
    emailError.innerText = '';
    errorLine(email, false);
    return true;

  } else {
    errorLine(email, true);
    emailError.innerText = 'example@gmail.com';
    return false;
  }
}

function isMessageValid(user) {
  if (user.message.length > 0) {
    messageError.innerText = '';
  return true;

  } else {
    messageError.innerText = 'Enter a message';
    return false;
  }
}

function errorLine(selector, bool) {
  if (bool) {
    let redLine = '1px solid #ff0000'
    style(selector, 'border', redLine);
  } else {
    let removeLine = '1px solid #141414'
    style(selector, 'border', removeLine);
  }
}
