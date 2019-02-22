import _ from 'lodash';

import rawData from '../data/json/out.json';
import scores from '../data/json/scores-norm.json';

// mentors array
const mentors = rawData.peoples['second_name-to_github_account'];

// tasks
const tasks = rawData.tasks.Sheet1;
tasks.forEach(taskObj => {
  taskObj.task = taskObj.task.trim();
});

const data = { tasks, mentors, scores };

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

const options = selectMentors(mentors);

export { data, options };
