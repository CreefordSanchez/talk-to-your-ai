'use strict';

import { listen, select, selectAll, style } from './data/utility.js';

class User {
  #firstName = '';
  #lastName = '';
  #email = '';
  #text = '';

  constructor(firstName, lastName, email, text) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#text = text;
  }

  set firstName(firstName) { this.#firstName = firstName; }
  get firstName() { return this.#firstName; }

  set lastName(lastName) { this.#lastName = lastName; }
  get lastName() { return this.#lastName; }

  set email(email) { this.#email = email; }
  get email() { return this.#email; }

  set text(text) { this.#text = text; }
  get text() { return this.#text; }
}
const submitBtn = select('.submit-contact');
const contactBtn = select('.contact-btn');
const contactContainer = select('.contact-form');
const firstName = select('.first-name');
const lastName = select('.last-name');
const email = select('.email-input');
const mssg = select('.message-input');

listen(submitBtn, 'click', () => {
  style(contactContainer, 'display', 'none');
  validation();
});

listen(contactBtn, 'click', () => {
  style(contactContainer, 'display', 'flex');
});

function validation() {
  const userForm = new User (
    firstName.value, lastName.value, email.value, mssg.value
  );
  console.log(userForm);
  let arr = JSON.stringify(userForm);
  console.log(arr);
}