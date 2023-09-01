import axios from 'axios';
import { openPopupById, alertInfo, alertError } from '../js/popup';

const ORDERS_API = `https://tasty-treats-backend.p.goit.global/api/orders/add`;
const EVENTS_API = `https://tasty-treats-backend.p.goit.global/api/events`;
const CATEGORIES_API = `https://tasty-treats-backend.p.goit.global/api/categories`;
const RECIPES_API = `https://tasty-treats-backend.p.goit.global/api/recipes`; /* ?category=Beef&page=1&limit=6&time=160&area=Irish&ingredients=640c2dd963a319ea671e3796 */
const AREAS_API = `https://tasty-treats-backend.p.goit.global/api/areas`;
const INGREDIENTS_API = `https://tasty-treats-backend.p.goit.global/api/ingredients`;
const POPULAR_API = `https://tasty-treats-backend.p.goit.global/api/recipes/popular`;

// GET EVENTS
export async function getEvents() {
  try {
    const eventData = await axios.get(EVENTS_API);
    return eventData.data;
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
