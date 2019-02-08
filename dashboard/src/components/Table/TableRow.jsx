import React from 'react';

const NO_DATA_PLACEHOLDER = '—';

export default ({ task, students, scores }) => {
  const firstCell = (
    <td>
      <a href={task.link}>{task.name}</a>
    </td>
  );

  const cells = students.map(studentGithub => {
    let cellText;
    const studentScore = scores[studentGithub];
    if (studentScore === undefined) {
      cellText = NO_DATA_PLACEHOLDER;
    } else {
      const grade = studentScore['Оценка'];
      cellText = grade === undefined ? NO_DATA_PLACEHOLDER : grade;
    }

    return <td key={studentGithub}>{cellText}</td>;
  });

  return (
    <tr>
      {firstCell}
      {cells}
    </tr>
  );
};
