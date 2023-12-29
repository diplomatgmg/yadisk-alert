import YaDisk from './YaDisk.js';

document.addEventListener('DOMContentLoaded', async () => {
  const saveTokenForm = document.querySelector('#saveTokenForm');
  const saveTokenInput = document.querySelector('#saveTokenInput');
  const saveButton = saveTokenForm.querySelector('button[type="submit"]');
  const displayTokenInfo = (token, isValid) => {
    const infoElement = document.createElement('p');

    if (isValid) {
      infoElement.textContent = 'Токен успешно добавлен!';
      infoElement.classList.add('success');
      saveTokenInput.outerHTML = `<p>${token.slice(0, 15)}********</p>`;
      saveButton.disabled = true;
    } else {
      infoElement.textContent = 'Неверный токен!';
      infoElement.classList.add('error');
    }

    saveTokenForm.appendChild(infoElement);
  };

  const validateAndDisplayToken = async () => {
    const token = saveTokenInput.value;
    const isValidToken = await YaDisk.isValidToken(token);

    displayTokenInfo(token, isValidToken);

    if (isValidToken) {
      await YaDisk.setToken(token);
    }
  };

  saveTokenForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await validateAndDisplayToken();
  });

  const initialToken = await YaDisk.getToken();

  if (initialToken !== null) {
    const initialIsValidToken = await YaDisk.isValidToken(initialToken);
    displayTokenInfo(initialToken, initialIsValidToken);
  }
});
