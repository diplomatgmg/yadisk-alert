export default class YaDisk {
  url = new URL('https://cloud-api.yandex.net/v1/disk/');

  // eslint-disable-next-line class-methods-use-this
  getToken() {
    return new Promise((resolve) => {
      chrome.storage.local.get('accessToken', ({ accessToken }) => {
        resolve(accessToken);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  setToken(token) {
    chrome.storage.local.set({ accessToken: token }, () => {});
  }

  async isValidToken() {
    const token = await this.getToken();

    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${token}`,
      },
    });

    return response.status === 200;
  }
}
