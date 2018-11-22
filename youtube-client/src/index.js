import './assets/styles/style.css';

import SearchBar from './components/SearchBar';
import ClipsContainer from './components/ClipsContainer';
import Pagination from './components/Pagination';

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
const clipsContainer = new ClipsContainer(bottom, pagination);
const searchBar = new SearchBar();
searchBar.inputEventObserver.subscribe(clipsContainer.onSearch.bind(clipsContainer));

// mount application parts to the DOM
document.body.appendChild(app);
app.appendChild(searchBar.node);
app.appendChild(bottom);
bottom.appendChild(clipsContainer.node);
app.appendChild(pagination.view.node);

// for testing
clipsContainer.addCards(data);
