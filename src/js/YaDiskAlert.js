export default class YaDiskAlert {
  constructor(yaDisk, audioPath) {
    this.url = `${yaDisk.url}resources/last-uploaded`;
    this.audioPath = audioPath;
    this.loadedData = null;
    this.yaDisk = yaDisk;
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

    setInterval(this.checkForNewVideos.bind(this), 1000);
  }
}
