const YOUTUBE_SEARCH_API_URL = 'https://www.googleapis.com/youtube/v3/';

const API_KEY = 'AIzaSyCO91lXUmyHSjptIytppH21bKNTF_9pBT8';
const MAX_RESULT = 15;

const buildRequestWithApiKey = (domain, params) => {
  const query = new URLSearchParams(params);
  query.append('key', API_KEY);
  return `${YOUTUBE_SEARCH_API_URL}${domain}?${query.toString()}`;
};

const requestVideoListUrl = (q, pageToken) => buildRequestWithApiKey('search', {
  q,
  pageToken,
  maxResults: MAX_RESULT,
  part: 'snippet',
  type: 'id',
  fields: 'items(id/videoId),nextPageToken,pageInfo,prevPageToken',
});

const requestStatsOfVideos = ids => buildRequestWithApiKey('videos', {
  id: ids.join(','),
  part: 'snippet,statistics',
  fields:
      'items(id,snippet(channelTitle,description,publishedAt,thumbnails/medium,title),statistics/viewCount)',
});

const getStatsOfVideos = (data) => {
  const ids = data.items.map(i => i.id.videoId);
  const url = requestStatsOfVideos(ids);
  // console.log(url);
  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      const result = { ...data, ...json };
      // console.log(JSON.stringify(result, undefined, 2));
      return result;
    })
    .catch(error => console.log('error', error));
};

const getVideoIds = (q, pageToken = '') => {
  console.log('get videos ids for:', q);
  const url = requestVideoListUrl(q, pageToken);
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))
    .then((json) => {
      // console.log(JSON.stringify(json, undefined, 2));
      return json;
    })
    .then((data) => {
      // console.log(videoIds);
      return data;
    });
};

const search = q => getVideoIds(q).then(ids => getStatsOfVideos(ids));

export { search };

// search('belarus')
