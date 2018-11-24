import './assets/styles/style.css';

import SearchBar from './components/SearchBar';
import ClipsContainer from './components/ClipsContainer';
import Pagination from './components/Pagination';
import SwipeableContainer from './components/SwipeableContainer';

// for testing
import data from '../test/response.json';

const createApp = () => {
  const app = document.createElement('div');
  app.id = 'app';
  return app;
};

const createBottom = () => {
  const bottom = document.createElement('div');
  bottom.classList.add('bottom');
  return bottom;
};

const createPagination = () => {
  const pagination = new Pagination();
  return pagination;
};

// create application parts
const app = createApp();
const bottom = createBottom();
const pagination = createPagination();
const clipsContainer = new ClipsContainer();
const searchBar = new SearchBar();

// connect clips container with pagination
clipsContainer.model.pageIndexObserver.subscribe(pagination.goToPage.bind(pagination));
pagination.pageSelectObserver.subscribe(clipsContainer.onGoToPage.bind(clipsContainer));

// connect clips container with search bar
searchBar.inputEventObserver.subscribe(clipsContainer.onSearch.bind(clipsContainer));

// make bottom container swipeable
const swipeable = new SwipeableContainer(bottom, clipsContainer.onSwipe.bind(clipsContainer));

// mount application parts to the DOM
document.body.appendChild(app);
app.appendChild(searchBar.node);
app.appendChild(bottom);
bottom.appendChild(clipsContainer.view.node);
app.appendChild(pagination.view.node);

// for testing
// clipsContainer.addCards(data);
