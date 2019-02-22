import React from 'react';
import PropTypes from 'prop-types';

const MARKED_CLASS = 'marked';

const taskStatusToClassName = {
  Checked: 'checked',
  Checking: 'checking',
  'In Progress': 'in_progress',
  ToDo: 'todo',
};

const mapTaskStatusToClassName = (status, isChecked) => {
  if (isChecked) {
    return MARKED_CLASS;
  }
  const className = taskStatusToClassName[status] || null;
  return className;
};

const Cell = ({ status, isChecked, score }) => {
  const className = mapTaskStatusToClassName(status, isChecked);
  return <td className={className}>{score}</td>;
};

Cell.propTypes = {
  status: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Cell;
