window.addEventListener('DOMContentLoaded', async () => {
  const response = await window.fetch('/api/users');
  const data = await response.json();

  document.body.insertAdjacentHTML('afterbegin', data.name);

  const btn = document.querySelector('#btn');

  btn?.addEventListener('click', () => {
    document.body.insertAdjacentHTML('beforeend', 'e2e is awesome');
  });
});
