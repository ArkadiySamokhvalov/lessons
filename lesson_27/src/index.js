import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopUp';
import toggleTabs from './modules/slider';
import slider from './modules/toggleTabs';
import changePhoto from './modules/changePhoto';
import validation from './modules/validation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'formdata-polyfill';
import 'es6-promise/auto';
import 'dom-node-polyfills';
import 'fetch-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  /* Таймер */
  let date = new Date();
  countTimer((date.getDate()+1) + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' 00:00:00');
  /* Меню */
  toggleMenu();
  /* PopUp */
  togglePopup();
  /* Табы */
  toggleTabs();
  /* Слайдер */
  slider();
  /* Смена фото */
  changePhoto();
  // Валидация калькулятора
  validation.validationCalc();
  // Валидация форм
  validation.validationForms();
  /* калькулятор */
  calc(100);
  /* Отправка формы ajax */
  sendForm();
});