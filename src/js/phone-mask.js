import Inputmask from 'inputmask';
const phones = document.querySelectorAll('input[type="tel"]');
const phoneMask = new Inputmask('+389999999999');
phones.forEach(phone => {
  phoneMask.mask(phone);
});
