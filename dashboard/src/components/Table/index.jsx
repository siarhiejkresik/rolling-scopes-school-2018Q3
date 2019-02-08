import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

export default ({ scores, students, tasks }) => (
  <table>
    <TableHead students={students} />
    <TableBody tasks={tasks} students={students} scores={scores} />
  </table>
);
