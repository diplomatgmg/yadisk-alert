export default class YaDisk {
  static url = new URL('https://cloud-api.yandex.net/v1/disk/');

  static getToken() {
    return new Promise((resolve) => {
      chrome.storage.local.get('accessToken', ({ accessToken }) => {
        resolve(accessToken || null);
      });
    });
  }

  static setToken(token) {
    chrome.storage.local.set({ accessToken: token }, () => {});
    chrome.runtime.reload();
  }

  static async isValidToken(token) {
    try {
      const response = await fetch(this.url, {
        method: 'GET',
        headers: {
          Authorization: `OAuth ${token}`,
        },
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
