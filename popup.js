document.querySelector('#saveTokenForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const token = new FormData(e.target).get('token');
  chrome.storage.local.set({ accessToken: token }, () => {
    console.log('Токен сохранен:', token);
  });

  chrome.runtime.reload();
});
