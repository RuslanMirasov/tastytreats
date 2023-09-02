import { refs, formatDescription } from './refs';
import { getFromDB } from './axios';
import { alertError } from '../js/popup';

initSidebar();

async function initSidebar() {
  try {
    await renderCategories();
    await renderPopular();
  } catch (error) {
    alertError(error.request.statusText, error.message);
  }
}

async function renderCategories() {
  const categoryData = await getFromDB(`${refs.db}/categories`);
  if (refs.sidebar && categoryData) {
    const categoriesMarkup = `
      <button type="button" class="button button--gray big full active" data-ollcategories>All categories</button>
      <ul class="category-list custom-scrollbar">
         ${categoryData.map(({ _id, name }) => `<li><button type="button" data-category='${_id}'>${name}</button></li>`).join('')}
      </ul>
    `;
    refs.sidebar.insertAdjacentHTML('beforeend', categoriesMarkup);
  }
}

async function renderPopular() {
  const popularData = await getFromDB(`${refs.db}/recipes/popular`);
  if (refs.sidebar && popularData) {
    const popularMarkup = `
      <div class="popuplar">
         <h2 class="title title--h2">Popular recipes</h2>
         <ul class="popuplar-list">
            ${popularData
              .map(
                ({ _id, title, preview, description }) => `
                  <li data-id="${_id}">
                     <div class="popular-list__image">
                        <img src="${preview}" alt="${title}" width="64" height="64"/>
                     </div>
                     <div class="popular-list__info">
                        <h4 class="title title--h4">${title}</h4>
                        <p class="description">${formatDescription(description, 84, 60, 150)}</p>
                     </div>
                  </li>
                `
              )
              .join('')}
         </ul>
      </div>
     `;
    refs.sidebar.insertAdjacentHTML('beforeend', popularMarkup);
  }
}
