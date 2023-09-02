import SlimSelect from 'slim-select';
import { refs, uppercaseFirstLetter } from './refs';
import { getFromDB } from './axios';
import { alertError } from '../js/popup';

renderCatalogFilter();

async function renderCatalogFilter() {
  try {
    await renderTimeInput();
    await renderSelectInput('area', 'areas');
    await renderSelectInput('ingredients', 'ingredients');
    initSelectInputs();
  } catch (error) {
    alertError(error.request.statusText, error.message);
  }
}

async function renderTimeInput() {
  if (refs.catalogFilter) {
    let timeValues = [];
    for (let i = 5; i <= 150; i += 5) {
      timeValues.push(i);
    }
    console.log(timeValues);
    const timeInputMarkup = `
       <label class="label label--time" for="time">
          <span class="label__text">Time</span>
          <span class="label__input">
          <select name="time" id="time" class="input" autocomplete="true">
             <option data-placeholder="true"></option>
             ${timeValues.map(index => `<option value="${index}">${index} min.</option>`).join('')}
          </select>
          </span>
       </label>
       `;
    refs.catalogFilter.insertAdjacentHTML('beforeend', timeInputMarkup);
  }
}

async function renderSelectInput(selectName, path) {
  const selectOptions = await getFromDB(`${refs.db}/${path}`);
  if (refs.catalogFilter && selectOptions) {
    const selectInputMarkup = `
           <label class="label label--${selectName}" for="${selectName}">
             <span class="label__text">${uppercaseFirstLetter(selectName)}</span>
             <span class="label__input">
               <select name="${selectName}" id="${selectName}" class="input" autocomplete="true">
                 <option data-placeholder="true"></option>
                 ${selectOptions.map(({ _id, name }) => `<option data-id="${_id}" value="${name}">${name}</option>`).join('')}
               </select>
             </span>
           </label>
      `;
    refs.catalogFilter.insertAdjacentHTML('beforeend', selectInputMarkup);
  }
}

function initSelectInputs() {
  const ollSelectInputs = document.querySelectorAll('select');
  if (ollSelectInputs.length > 0) {
    ollSelectInputs.forEach(select => {
      new SlimSelect({
        select: select,
        settings: {
          showSearch: false,
          placeholderText: 'Select...',
          allowDeselect: true,
        },
      });
    });
  }
}
