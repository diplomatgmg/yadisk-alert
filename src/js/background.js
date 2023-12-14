import YaDisk from './YaDisk.js';
import YaDiskAlert from './YaDiskAlert.js';

(async () => {
  const yaDisk = new YaDisk();
  console.log('valid token:', await yaDisk.isValidToken());

  const audioPath = 'assets/sounds/notification.mp3';
  const yaDiskAlert = new YaDiskAlert(yaDisk, audioPath);

  await yaDiskAlert.polling();
})();
