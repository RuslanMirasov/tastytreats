export const refs = {
  body: document.querySelector('.body'),
  main: document.querySelector('.main'),
  header: document.querySelector('.header'),
  dataBase: 'https://tasty-treats-backend.p.goit.global/api',

  //popups
  openPopupButtons: document.querySelectorAll('[data-popup]'),
  allCustomPopups: document.querySelectorAll('.custom-popup'),
  fixedElements: [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed'),

  //forms
  inputs: document.querySelectorAll('.input'),
  requestForm: document.querySelectorAll('.form--request'),
  addErrorText: true,

  //scroll to block
  scrollLinks: document.querySelectorAll('[data-scrollto]'),
  amimateElements: document.querySelectorAll('[data-animation]'),
};
