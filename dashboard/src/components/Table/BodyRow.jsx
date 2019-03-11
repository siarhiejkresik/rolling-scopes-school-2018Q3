import React from 'react';
import _ from 'lodash';

import Cell from './BodyRowCell';

export default ({ task, students, scores }) => {
  const firstCell = (
    <td className="row-name">
      <a href={task.link}>{task.name}</a>
    </td>
  );

  const cells = students.map(studentGithub => {
    const isTaskCheckedByMentor = _.has(scores, studentGithub);
    let score;
    if (isTaskCheckedByMentor) {
      score = scores[studentGithub]['Оценка'] || '—';
    } else {
      score = '—';
    }

    return (
      <Cell
        key={studentGithub}
        score={score}
        status={task.status}
        isChecked={isTaskCheckedByMentor}
      />
    );
  });

  return (
    <tr>
      {firstCell}
      {cells}
    </tr>
  );
};
