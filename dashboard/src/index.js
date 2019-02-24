import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

import Dashboard from './components/dashboard';
import { data } from './create-data';

ReactDOM.render(<Dashboard data={data} />, document.getElementById('dashboard'));
