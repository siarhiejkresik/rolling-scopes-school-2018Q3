import React from 'react';
import Select from 'react-select';

import Table from './Table';
import NoDataPlaceholder from './NoDataPlaceHolder';

import { getUserNameFromGithubLink as getNameFromGithubLink } from './utils';
import { selectMentors } from '../scripts/create-data';

const LOCAL_STORAGE_KEY = 'mentor_dashboard';

const localStorageHandler = {
  save: githubName => localStorage.setItem(LOCAL_STORAGE_KEY, githubName),
  load: () => localStorage.getItem(LOCAL_STORAGE_KEY),
};

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

  getStudentsByMentor(mentorGithub) {
    // const { mentorGithub } = this.state;
    if (!mentorGithub) {
      return [];
    }
    const { mentors } = this.data;
    let { students } = mentors.filter(
      mentor_ => getNameFromGithubLink(mentor_.GitHub) === mentorGithub
    )[0];
    students = students.map(student => student.toLocaleLowerCase());
    return students;
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
    const students = this.getStudentsByMentor(mentorGithub);
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
