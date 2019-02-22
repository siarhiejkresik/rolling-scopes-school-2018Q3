import React from 'react';
import Select from 'react-select';

import Table from './Table';
import NoDataPlaceholder from './NoDataPlaceHolder';

import { getUserNameFromGithubLink } from './utils';
import { data, options } from '../create-data';

class Dashboard extends React.Component {
  constructor() {
    super();
    console.log(data);
    this.data = data;
    this.state = { mentorGithub: null };
    this.handleInput = this.handleInput.bind(this);
  }

  getStudentsByMentor(mentorGithub) {
    // const { mentorGithub } = this.state;
    if (!mentorGithub) {
      return [];
    }
    const { mentors } = this.data;
    let { students } = mentors.filter(
      mentor_ => getUserNameFromGithubLink(mentor_.GitHub) === mentorGithub
    )[0];
    students = students.map(student => student.toLocaleLowerCase());
    return students;
  }

  handleInput(e) {
    let mentorGithub = e.github || null;
    if (mentorGithub) {
      mentorGithub = getUserNameFromGithubLink(mentorGithub);
    }
    this.setState(prevState => ({
      ...prevState,
      mentorGithub,
    }));
  }

  render() {
    const { mentorGithub } = this.state;

    const { tasks } = this.data;
    const students = this.getStudentsByMentor(mentorGithub);
    const scores = this.data.scores[mentorGithub];

    return (
      <div>
        <Select options={options} onChange={this.handleInput} autofocus />
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
