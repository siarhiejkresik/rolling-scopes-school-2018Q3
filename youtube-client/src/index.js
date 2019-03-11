import './assets/styles/style.css';

import SearchBar from './components/SearchBar';
import ClipsContainer from './components/ClipsContainer';
import Pagination from './components/Pagination';
import SwipeableContainer from './components/SwipeableContainer';

import YoutubeApi from './api/YoutubeApi';

const createApp = () => {
  const app = document.createElement('div');
  app.classList.add('app');
  return app;
};

const createBottom = () => {
  const bottom = document.createElement('div');
  bottom.classList.add('bottom');
  return bottom;
};

// create application parts
const app = createApp();
const bottom = createBottom();
const pagination = new Pagination();
const clipsContainer = new ClipsContainer();
const searchBar = new SearchBar();

// connect clips container with pagination
clipsContainer.model.pageIndexObserver.subscribe(pagination.goToPage.bind(pagination));
pagination.pageSelectObserver.subscribe(clipsContainer.onGoToPage.bind(clipsContainer));

// make bottom container swipeable
// eslint-disable-next-line no-unused-vars
const swipeable = new SwipeableContainer(bottom, clipsContainer.onSwipe.bind(clipsContainer));

const api = new YoutubeApi();
api.callbackOK = clipsContainer.onResponseOk.bind(clipsContainer);
api.callbackErr = clipsContainer.onResponseErr.bind(clipsContainer);

// connect clips container and search bar with youtube api
searchBar.inputEventObserver.subscribe(api.request.bind(api));
clipsContainer.api = api; // ugly monkey-patching

// mount application parts to the DOM
document.body.appendChild(app);
app.appendChild(searchBar.node);
app.appendChild(bottom);
bottom.appendChild(clipsContainer.view.node);
app.appendChild(pagination.view.node);
