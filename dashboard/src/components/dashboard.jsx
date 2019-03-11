import React from 'react';
import Select from 'react-select';

import Table from './Table';
import NoDataPlaceholder from './NoDataPlaceHolder';

import { getNameFromGithubLink } from '../scripts/utils';
import { selectMentors, selectStudentsByMentor } from '../scripts/data-selectors';

import localStorageHandler from '../scripts/local-storage';

class Dashboard extends React.Component {
  constructor({ data }) {
    super();
    console.log(data);
    this.data = data;
    this.options = selectMentors(data.mentors);

    const mentorGithub = localStorageHandler.load() || null;
    this.state = { mentorGithub };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let mentorGithub = e.github || null;
    if (mentorGithub) {
      mentorGithub = getNameFromGithubLink(mentorGithub);
    }
    this.setState(prevState => ({
      ...prevState,
      mentorGithub,
    }));
    localStorageHandler.save(mentorGithub);
  }

  render() {
    const { mentorGithub } = this.state;

    const { tasks } = this.data;
    const students = selectStudentsByMentor(this.data.mentors, mentorGithub);
    const scores = this.data.scores[mentorGithub];
    return (
      <div className="dashboard-container">
        <Select options={this.options} onChange={this.handleInput} autofocus />
        {scores ? (
          <Table tasks={tasks} students={students} scores={scores} />
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    );
  }
}

export default Dashboard;
