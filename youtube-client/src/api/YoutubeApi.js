import request from './request';
import urls from './urls';

export default class {
  constructor() {
    this.q = '';
    this.nextPageToken = '';
    this.callbackOK = undefined;
    this.callbackErr = undefined;
  }

  requestNext() {
    this.request(this.q, this.nextPageToken);
  }

  request(q, pageToken = '') {
    if (!q || q === '') {
      return;
    }
    this.q = q;

    let result = {};
    request(urls.searchList({ q, pageToken }))
      .then((responseText) => {
        const searchList = JSON.parse(responseText);
        // store search list data
        result = searchList;
        // extract video ids list
        const videosIds = searchList.items.map(item => item.id.videoId).join(',');
        return request(urls.videosStats({ id: videosIds }));
      })
      .then((responseText) => {
        const videoStats = JSON.parse(responseText);
        return { ...result, ...videoStats };
      })
      .then(this.onSearchOk.bind(this))
      .catch(this.onSearchErr.bind(this));
  }

  onSearchOk(result) {
    this.nextPageToken = result.nextPageToken;
    this.callbackOK({ ...result, q: this.q });
  }

  onSearchErr(error) {
    this.callbackOK(error);
  }
}
