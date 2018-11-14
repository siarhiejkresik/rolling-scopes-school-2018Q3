import './assets/styles/style.css';

import SearchBar from './components/SearchBar';
import ClipsContainer from './components/ClipsContainer';
import Swipeable from './components/SwipeableContainer';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

const searchBar = new SearchBar();
searchBar.render(app);

const bottom = document.createElement('div');
bottom.classList.add('bottom');
app.appendChild(bottom);

const clipsContainer = new ClipsContainer();
clipsContainer.render(bottom);

const s = new Swipeable(bottom, clipsContainer.node);
