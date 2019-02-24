const XLSX_DIR = '../../data/xlsx';
const JSON_DIR = './data/json';
const JSON_FILE_NAME = 'data.json';

const SHEET_NAMES = {
  mentorData: 'second_name-to_github_account',
  scores: 'Form Responses 1',
};

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
    [SHEET_NAMES.mentorData]: {
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
    [SHEET_NAMES.scores]: {
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

module.exports = { XLSX_DIR, JSON_DIR, JSON_FILE_NAME, SHEET_NAMES, DATA_SCHEMES };
