document.querySelector('#saveTokenForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const token = new FormData(e.target).get('token');
  chrome.storage.local.set({ accessToken: token }, () => {
    console.log('Токен сохранен:', token);
  });

  chrome.runtime.reload();
});

document.querySelector('#saveTokenInput').addEventListener('input', (e) => {
  const inputValue = e.target.value;

  const isValid = /.{20,}/g.test(inputValue);

  const button = document.querySelector('input[type="submit"]');
  button.disabled = !isValid;
});
