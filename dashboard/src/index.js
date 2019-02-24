import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

import Dashboard from './components/dashboard';
import data from '../data/json/data.json';

ReactDOM.render(<Dashboard data={data} />, document.getElementById('dashboard'));
