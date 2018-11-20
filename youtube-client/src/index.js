import './assets/styles/style.css';

import SearchBar from './components/SearchBar';
import ClipsContainer from './components/ClipsContainer';
import Pagination from './components/Pagination';

import API from './api/index';

// debugger;

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

const app = createApp();
const bottom = createBottom();
const pagination = createPagination();
const clipsContainer = new ClipsContainer(bottom, pagination);
const searchBar = new SearchBar(clipsContainer.onSearch.bind(clipsContainer));
// pagination.goToPage(16, 20);

document.body.appendChild(app);
app.appendChild(searchBar.node);
app.appendChild(bottom);
bottom.appendChild(clipsContainer.node);
app.appendChild(pagination.node);

// const s = new Swipeable(bottom, clipsContainer.node);

// for testing
const api = new API();
clipsContainer.addCards(api.fetchData());

// debugger;
