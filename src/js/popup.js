import { refs } from '../js/refs';

window.addEventListener('keyup', closePopupByEsc);

function closePopupByEsc(e) {
  if (e.key === 'Escape' && refs.body.classList.contains('locked')) {
    closeOllPopups();
    scrollbarReset();
  }
}

refs.openPopupButtons.forEach(openBtn => {
  openBtn.addEventListener('click', popupOpen);
});

refs.allCustomPopups.forEach(popup => {
  popup.addEventListener('click', popupClose);
});

export function popupOpen(e) {
  e.preventDefault();
  const popupId = this.dataset.popup;
  openPopupById(popupId);
}

export function popupClose(e) {
  if (e.target.classList.contains('js-popup-close') || e.target.classList.contains('custom-popup')) {
    closeOllPopups();
    scrollbarReset();
  }
}

export function openPopupById(id) {
  closeOllPopups();
  if (!refs.body.classList.contains('locked')) {
    scrollbarModify();
    refs.body.classList.add('locked');
  }
  document.getElementById(id).classList.add('is-open');
}

export function closeOllPopups() {
  refs.allCustomPopups.forEach(popup => {
    if (popup.classList.contains('is-open')) {
      popup.classList.remove('is-open');
    }
  });
}

export function scrollbarModify() {
  const scrollbarWidth = window.innerWidth - document.querySelector('main').offsetWidth;
  refs.body.style.paddingRight = scrollbarWidth + 'px';
  refs.fixedElements.forEach(fix => {
    if (!fix.classList.contains('custom-popup')) {
      fix.style.paddingRight = scrollbarWidth + 'px';
    }
  });
}

export function scrollbarReset() {
  setTimeout(() => {
    refs.body.style.paddingRight = '0px';
    refs.fixedElements.forEach(fix => {
      if (!fix.classList.contains('custom-popup')) {
        fix.style.paddingRight = '0px';
      }
    });
    refs.body.classList.remove('locked');
  }, 400);
}

export function alertError(title, subtitle) {
  const errorTitle = document.querySelector('.js-error-title');
  const errorSubtitle = document.querySelector('.js-error-text');
  errorTitle.innerHTML = title;
  errorSubtitle.innerHTML = subtitle;
  openPopupById('error');
}

export function alertInfo(title, subtitle) {
  const infoTitle = document.querySelector('.js-info-title');
  const infoSubtitle = document.querySelector('.js-info-subtitle');
  infoTitle.innerHTML = title;
  infoSubtitle.innerHTML = subtitle;
  openPopupById('info');
}
