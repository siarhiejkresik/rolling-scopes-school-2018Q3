import React from 'react';

import TableRow from './BodyRow';

export default ({ tasks, students, scores }) => (
  <tbody>
    {tasks.map(task => {
      const taskName = task.task || '';
      const taskLink = task.link || '';
      const taskStatus = task.Status;
      const taskScores = scores[taskName];
      const taskData = { name: taskName, link: taskLink, status: taskStatus };
      return <TableRow key={taskName} task={taskData} students={students} scores={taskScores} />;
    })}
  </tbody>
);
