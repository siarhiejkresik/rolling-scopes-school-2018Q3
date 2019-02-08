import React from 'react';

import TableRow from './TableRow';

export default ({ tasks, students, scores }) => (
  <tbody>
    {tasks.map(task => {
      const taskName = task.task || '';
      const taskLink = task.link || '';
      const taskScores = scores[taskName];
      if (!taskScores) {
        return null;
      }
      const taskData = { name: taskName, link: taskLink };
      return <TableRow key={taskName} task={taskData} students={students} scores={taskScores} />;
    })}
  </tbody>
);
