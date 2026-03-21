const jokeText = document.querySelector('#joke');
const button = document.querySelector('#joke-btn');
const errorText = document.querySelector('#error');

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

  } catch (error) {
    errorText.textContent = 'Something went wrong — please try again.';
    jokeText.textContent = '...';
  } finally {
    button.textContent = 'Get another joke';
    button.disabled = false;
  }
});