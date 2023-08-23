import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const API_KEY =
  'api_key=live_ZeXDGhtuWrssmmRmrRZANIT0NMmyqar824KGsvFg08y0O1O4frnrXfK6efQWlBal';
axios.defaults.headers.common['x-api-key'] = API_KEY;

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
console.log(refs.loader);

const select = new SlimSelect({
  select: '#breedSelect',
});

// ? Выбор пород котов для поиска
fetchBreeds()
  .then(data => {
    const catBreeds = data.map(({ id, name }) => ({
      value: id,
      text: name,
    }));
    const options = catBreeds;
    // console.log(options);

    select.setData(options);

    refs.select.classList.remove('is-hidden');
    refs.select.addEventListener('change', onBreedSelect);
  })
  .catch(error => {
    console.log(error);
    refs.error.classList.remove('is-hidden');
  })
  .finally(() => {
    refs.loader.classList.add('is-hidden');
  });

// ? Поиск кота по id породы
function onBreedSelect(event) {
  refs.loader.classList.remove('is-hidden');
  refs.error.classList.add('is-hidden');
  refs.catInfo.classList.add('is-hidden');
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId)
    .then(res => {
      const markup = createMarcup(res[0]);
      refs.catInfo.innerHTML = markup;
      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      console.log(error);
      refs.error.classList.remove('is-hidden');
    })
    .finally(() => {
      refs.loader.classList.add('is-hidden');
    });
}

function createMarcup(obj) {
  const img = obj.url;
  const { name, description, temperament } = obj.breeds[0];
  return `
  <img src="${img}" alt="${name}" width="500" height="400" />
      <div>
      <h2>${name}</h2>
      <p>
        ${description}
      </p>
      <p> <span class="temperament">Temperament:</span> ${temperament}</p>
      </div>
  `;
}
