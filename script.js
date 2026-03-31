const jokeText = document.querySelector('#joke');
const button = document.querySelector('#joke-btn');
const errorText = document.querySelector('#error');
const counter = document.querySelector('#counter');

let jokeCount = 0;

if (button) {
  button.addEventListener('click', async () => {
    button.textContent = 'Loading...';
    button.disabled = true;
    errorText.textContent = '';

    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('The API returned an error');
      }

      const data = await response.json();
      jokeText.textContent = data.joke;
      jokeCount = jokeCount + 1;
      counter.textContent = `${jokeCount} joke${jokeCount === 1 ? '' : 's'} loaded this session`;

    } catch (error) {
      errorText.textContent = 'Something went wrong — please try again.';
    } finally {
      button.textContent = 'Get another joke';
      button.disabled = false;
    }
  });
}