import React from 'react';
import Head from './Head';
import Body from './Body';

export default ({ scores, students, tasks }) => (
  <table>
    <TableHead students={students} />
    <TableBody tasks={tasks} students={students} scores={scores} />
  </table>
);
