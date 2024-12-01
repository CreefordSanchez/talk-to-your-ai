'use strict';

import { listen, select, style } from './data/utility.js';

const textArea = select('textarea');

listen(textArea, 'input', () => {
  style(textArea, 'height', 'auto');
  let newHeight = `${textArea.scrollHeight}px`;
  style(textArea, 'height', newHeight);
  console.log(newHeight);
});
