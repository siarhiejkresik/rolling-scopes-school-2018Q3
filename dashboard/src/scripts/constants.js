const XLSX_DIR = '../../data/xlsx';
const JSON_DIR = './data/json';

// xmsl data schemes

const tasks = {
  file: 'Tasks.xlsx',
  sheets: {
    Sheet1: {
      name: 'task',
      link: 'link',
      status: 'Status',
    },
  },
};

const peoples = {
  file: 'Mentor-students pairs.xlsx',
  sheets: {
    pairs: {
      mentorFullName: 'interviewer',
      studentGithub: 'student github',
    },
    'second_name-to_github_account': {
      name: 'Name',
      surname: 'Surname',
      city: 'City',
      count: 'Count',
      github: 'Github',
    },
  },
};

const scores = {
  file: 'Mentor score.xlsx',
  sheets: {
    'Form Responses 1': {
      mentorGithub: 'Ссылка на GitHub ментора в формате: https://github.com/nickname',
      studentGithub: 'Ссылка на GitHub студента в формате: https://github.com/nickname',
      taskName: 'Таск',
      taskScore: 'Оценка',
    },
  },
};

const DATA_SCHEMES = {
  tasks,
  peoples,
  scores,
};

module.exports = { XLSX_DIR, JSON_DIR, DATA_SCHEMES };
