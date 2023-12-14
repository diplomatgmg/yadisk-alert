class YaDiskAlert {
  constructor(token, audioPath) {
    this.token = token;
    this.url = 'https://cloud-api.yandex.net/v1/disk/resources/last-uploaded';
    this.audioPath = audioPath;
    this.loadedData = null;
  }

  async getLoadedVideos() {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${this.token}`,
      },
    });
    const data = await response.json();
    return data.items.map(({ name }) => name);
  }

  async playSound() {
    const audio = new Audio(this.audioPath);
    await audio.play();
  }

  async checkForNewVideos() {
    const loadedVideos = await this.getLoadedVideos();

    const difference = loadedVideos.filter((element) => !this.loadedData.includes(element));

    difference.forEach((video) => {
      console.log(`Появилось новое видео - ${video}`);
      this.loadedData = [...this.loadedData, ...difference];
      this.playSound();
    });
  }

  async polling() {
    if (!this.loadedData) {
      this.loadedData = await this.getLoadedVideos();
    }

    setInterval(this.checkForNewVideos.bind(this), 30000);
  }
}

function getToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get('accessToken', ({ accessToken }) => {
      resolve(accessToken);
    });
  });
}

async function run() {
  const token = await getToken();
  const audioPath = 'assets/sounds/notification.mp3';

  const yaDiskAlert = new YaDiskAlert(token, audioPath);
  await yaDiskAlert.polling();
}

run();
