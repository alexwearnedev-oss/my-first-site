const jokeText = document.querySelector('#joke');
const button = document.querySelector('#joke-btn');
const saveBtn = document.querySelector('#save-btn');
const errorText = document.querySelector('#error');
const counter = document.querySelector('#counter');
const favouritesList = document.querySelector('#favourites-list');

let jokeCount = parseInt(localStorage.getItem('jokeCount')) || 0;
let currentJoke = null;

// Load favourites from localStorage, default to empty array
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

// Show saved count on page load
if (counter) {
  counter.textContent = `${jokeCount} joke${jokeCount === 1 ? '' : 's'} loaded all time`;
}

// Render the favourites list
function renderFavourites() {
  if (favourites.length === 0) {
    favouritesList.innerHTML = '<p class="empty-state">No saved jokes yet — hit Save joke to add one!</p>';
    return;
  }
  favouritesList.innerHTML = favourites.map((joke, index) => `
    <li class="favourite-item">
      <p>${joke}</p>
      <button class="remove-btn" onclick="removeJoke(${index})">✕</button>
    </li>
  `).join('');
}

// Remove a joke by index
function removeJoke(index) {
  favourites.splice(index, 1);
  localStorage.setItem('favourites', JSON.stringify(favourites));
  renderFavourites();
}

// Fetch a joke
if (button) {
  button.addEventListener('click', async () => {
    button.textContent = 'Loading...';
    button.disabled = true;
    saveBtn.style.display = 'none';
    errorText.textContent = '';

    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      jokeText.textContent = data.joke;
      currentJoke = data.joke;
      saveBtn.style.display = 'inline-block';

      jokeCount++;
      localStorage.setItem('jokeCount', jokeCount);
      counter.textContent = `${jokeCount} joke${jokeCount === 1 ? '' : 's'} loaded all time`;

    } catch (error) {
      errorText.textContent = 'Something went wrong — please try again.';
    } finally {
      button.textContent = 'Get another joke';
      button.disabled = false;
    }
  });
}

// Save current joke to favourites
if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    if (!currentJoke || favourites.includes(currentJoke)) return;
    favourites.push(currentJoke);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    renderFavourites();
    saveBtn.textContent = 'Saved!';
    saveBtn.disabled = true;
    setTimeout(() => {
      saveBtn.textContent = 'Save joke';
      saveBtn.disabled = false;
    }, 1500);
  });
}

// Render on page load
renderFavourites();