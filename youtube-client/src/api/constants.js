export const API_KEY = 'AIzaSyCO91lXUmyHSjptIytppH21bKNTF_9pBT8';
export const MAX_RESULT = 15;

export const YOUTUBE_SEARCH_API_URL = 'https://www.googleapis.com/youtube/v3/';

// predefined query fields
export const domains = {
  videos: {
    part: 'snippet,statistics',
    fields:
      'items(id,snippet(channelTitle,description,publishedAt,thumbnails/medium,title),statistics/viewCount)',
  },
  search: {
    part: 'snippet',
    type: 'id',
    fields: 'items(id/videoId),nextPageToken,pageInfo,prevPageToken',
  },
};
