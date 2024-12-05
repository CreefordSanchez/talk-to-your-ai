'use strict';

import { listen, select, selectAll, style } from './data/utility.js';

class User {
  #firstName;
  #lastName;
  #email;
  #text;

  constructor(firstName, lastName, email, text) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
  }

  set firstName(firstName) {
    return this.#firstName;
  }
}

const submitBtn = select('.submit-contact');
const contactBtn = select('.contact-btn');
const contactContainer = select('.contact-form');

listen(submitBtn, 'click', () => {
  style(contactContainer, 'display', 'none');
});

listen(contactBtn, 'click', () => {
  style(contactContainer, 'display', 'flex');
});

function validation() {

}