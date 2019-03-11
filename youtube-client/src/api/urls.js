import { API_KEY, YOUTUBE_SEARCH_API_URL, domains } from './constants';

const mergeQueryParams = (domainParams, params) => ({ ...domainParams, ...params });

const buildUrl = (domain, params, apiKey = API_KEY) => {
  const mParams = mergeQueryParams(domains[domain], params);
  const query = new URLSearchParams(mParams);
  query.append('key', apiKey);
  return `${YOUTUBE_SEARCH_API_URL}${domain}?${query.toString()}`;
};

const searchListUrl = params => buildUrl('search', params);
const videosStatsUrl = params => buildUrl('videos', params);

const urls = {
  searchList: searchListUrl,
  videosStats: videosStatsUrl,
};

export default urls;
