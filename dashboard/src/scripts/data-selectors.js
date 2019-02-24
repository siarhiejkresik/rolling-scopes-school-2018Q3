import _ from 'lodash';

import { getNameFromGithubLink } from './utils';

function selectStudentsByMentor(mentors, mentorGithub) {
  if (!mentorGithub) {
    return [];
  }
  let { students } = mentors.filter(
    mentor_ => getNameFromGithubLink(mentor_.GitHub) === mentorGithub
  )[0];
  students = students.map(student => student.toLocaleLowerCase());
  return students;
}

function selectMentors(mentors) {
  return _.sortBy(
    mentors.map(mentor => {
      const github = mentor.GitHub;
      const fullName = `${mentor.Name} ${mentor.Surname}`;
      const label = `${fullName}`;
      const value = [mentor.Name, mentor.Surname, github].map(el =>
        String.prototype.toLocaleLowerCase.call(el)
      );
      return { label, value, github };
    }),
    mentor => mentor.label
  );
}

export { selectStudentsByMentor, selectMentors };
