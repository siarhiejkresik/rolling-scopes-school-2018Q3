import React from 'react';

export default ({ students }) => {
  const firstCell = <th>TABLE</th>;
  const cells = students.map(text => (
    <th key={text}>
      <a href={`https://github.com/${text}`}>{text}</a>
    </th>
  ));
  return (
    <thead>
      <tr>
        {firstCell}
        {cells}
      </tr>
    </thead>
  );
};
