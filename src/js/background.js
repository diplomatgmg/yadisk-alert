import YaDisk from './YaDisk.js';
import YaDiskAlert from './YaDiskAlert.js';

(async () => {
  const audioPath = 'assets/sounds/notification.mp3';
  const yaDiskAlert = new YaDiskAlert(YaDisk, audioPath);

  await yaDiskAlert.polling();
})();
