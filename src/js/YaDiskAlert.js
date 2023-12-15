export default class YaDiskAlert {
  constructor(yaDisk, audioPath, sleepIntarval) {
    this.url = `${yaDisk.url}resources/last-uploaded`;
    this.audioPath = audioPath;
    this.yaDisk = yaDisk;
    this.sleepIntarval = sleepIntarval;

    this.loadedData = null;
  }

  async getLoadedVideos() {
    const token = await this.yaDisk.getToken();

    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${token}`,
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

    if (difference.length > 0) {
      console.info('Найден новый файл');
      console.info(difference);
      this.loadedData = [...this.loadedData, ...difference];
      await this.playSound();
    }
  }

  // eslint-disable-line class-methods-use-this
  sleep() {
    return new Promise((resolve) => { setTimeout(resolve, this.sleepIntarval); });
  }

  async polling() {
    // noinspection InfiniteLoopJS
    while (true) { // eslint-disable-line no-constant-condition
      console.info('Ожидание новых файлов...');
      if (!this.loadedData) {
        this.loadedData = await this.getLoadedVideos(); // eslint-disable-line no-await-in-loop
      }

      await this.checkForNewVideos(); // eslint-disable-line no-await-in-loop
      await this.sleep(); // eslint-disable-line no-await-in-loop
    }
  }
}
