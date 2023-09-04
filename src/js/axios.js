import axios from 'axios';
import { openPopupById, alertInfo, alertError } from '../js/popup';

const ORDERS_API = `https://tasty-treats-backend.p.goit.global/api/orders/add`;
const RATING_API = `https://tasty-treats-backend.p.goit.global/api/recipes`;

// GET ELEMENTS FROM DB
export async function getFromDB(db) {
  try {
    const responseData = await axios.get(db);
    return responseData.data;
  } catch (error) {
    alertError(error.request.statusText, error.message);
  }
}

// ORDER SEND
export async function orderSend(form) {
  openPopupById('loading');
  const formData = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    comment: form.comment.value,
  };
  if (form.comment.value === '') {
    delete formData.comment;
  }
  axios({
    method: 'POST',
    url: ORDERS_API,
    data: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(request => {
      setTimeout(() => {
        alertInfo(request.data.message, 'Thank you for your order, <br>our manager will contact you shortly.');
        form.reset();
      }, 350);
    })
    .catch(error => {
      setTimeout(() => {
        alertError(error.request.statusText, 'The phone must be in format +380000000000');
      }, 350);
    });
}

// RATING SEND
export async function ratingSend(form) {
  openPopupById('loading');
  const formData = {
    rate: Number(form.rating.value),
    email: form.email.value,
  };
  axios({
    method: 'PATCH',
    url: `${RATING_API}/${form.id.value}/rating`,
    data: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(request => {
      setTimeout(() => {
        alertInfo(`Thank you!`, `You have given a rating of ${form.rating.value} for the recipe "${request.data.title}"`);
        ratingMarkupReset(form);
        form.reset();
      }, 350);
    })
    .catch(error => {
      setTimeout(() => {
        alertError('ERROR', error.response.data.message);
        ratingMarkupReset(form);
        form.reset();
      }, 350);
    });
}

function ratingMarkupReset(form) {
  form.querySelector('.rating__value').innerText = '0.0';
  form.querySelector('.rating__active').style.width = '0%';
}
