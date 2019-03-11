import { LOCAL_STORAGE_KEY } from './constants';

const localStorageHandler = {
  save: githubName => localStorage.setItem(LOCAL_STORAGE_KEY, githubName),
  load: () => localStorage.getItem(LOCAL_STORAGE_KEY),
};

export default localStorageHandler;
