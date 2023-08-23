const API_KEY =
  'live_ZeXDGhtuWrssmmRmrRZANIT0NMmyqar824KGsvFg08y0O1O4frnrXfK6efQWlBal';

const option = {
  headers: {
    'x-api-key': API_KEY,
  },
};

const BASIC_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${BASIC_URL}/breeds`).then(response => {
    if (!response.ok) {
      throw new Error('Oops! Something went wrong! Try reloading the page!');
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASIC_URL}/images/search?breed_ids=${breedId}`, option).then(
    response => {
      if (!response.ok) {
        throw new Error('Oops! Something went wrong! Try reloading the page!');
      }
      return response.json();
    }
  );
}
