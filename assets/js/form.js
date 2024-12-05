'use strict';

import { listen, select, selectAll, style } from './data/utility.js';


const submitBtn = select('.submit-contact');
const contactBtn = select('.contact-btn');
const contactContainer = select('.contact-form');

listen(submitBtn, 'click', () => {
  style(contactContainer, 'display', 'none');
});

listen(contactBtn, 'click', () => {
  style(contactContainer, 'display', 'flex');
});
