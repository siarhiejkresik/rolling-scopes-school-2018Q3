import React from 'react';
import Head from './Head';
import Body from './Body';

import './index.css';

export default ({ scores, students, tasks }) => (
  <table className="dashboard-table">
    <Head students={students} />
    <Body tasks={tasks} students={students} scores={scores} />
  </table>
);
