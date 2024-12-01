'use strict';

export function listener(selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

export function selector(selector) {
  return document.querySelector(selector);
}