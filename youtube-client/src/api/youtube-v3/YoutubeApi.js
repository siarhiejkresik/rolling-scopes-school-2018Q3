export default class {
  constructor(apiKey, maxResult = 15) {
    this.apiKey = apiKey;
    this.maxResult = maxResult;
    this.q = null;
    this.previousPageToken = null;
    this.nextPageToken = null;
  }

  requestNext() {}

  requestPrevious() {}

  request(q) {
    this.q = q;
  }

}

class ApiHandler{
  constructor
}

requestVideosInfo(ids) {}

requestVideoIds(q) {}
