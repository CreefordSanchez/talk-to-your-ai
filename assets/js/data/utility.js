'use strict';

export function listen(selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

export function select(selector) {
  return document.querySelector(selector);
}

export function style(selector, type, value) {
  return selector.style[type] = value;
}

export function selectAll(selector) {
  return document.querySelectorAll(selector);
}
