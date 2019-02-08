const path = require('path');
const fs = require('fs');

const XLSX = require('xlsx');
const _ = require('lodash');
const utils = require('./components/utils');

const DATA_FOLDER = '../data';

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

function readXLSXFile(fileName) {
  return XLSX.readFile(path.join(__dirname, DATA_FOLDER, fileName));
}

function workBookSheetToJSON(workBook, sheetName) {
  return XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
}

function getSheets(workBook, sheetNames) {
  return _.mapValues(sheetNames, (obj, sheetName) => workBookSheetToJSON(workBook, sheetName));
}

function getRawData(schemas = DATA_SCHEMES) {
  return _.mapValues(schemas, schema => {
    const workBook = readXLSXFile(schema.file);
    return getSheets(workBook, schema.sheets);
  });
}

function saveToJSON(obj, fileName) {
  fs.writeFileSync(fileName, JSON.stringify(obj, null, 2));
}

function normalizeRawPairs(pairs) {
  // group by mentor
  const result = _.groupBy(pairs, obj => obj.interviewer);
  // for each mentor collect students to an array
  _.forEach(result, (arr, mentor) => {
    result[mentor] = _.sortBy(
      arr.map(obj => String(obj[peoples.sheets.pairs.studentGithub] || '').trim())
    );
  });
  return result;
}

/**
 * For each mentor add a field with an array of his students
 * @param {} mentors
 * @param {*} pairs
 */
function mergePairsToMentors(mentors, pairs) {
  mentors.forEach(mentor => {
    const fullName = `${mentor.Name} ${mentor.Surname}`;
    if (fullName in pairs) {
      const students = pairs[fullName];
      mentor.students = students;
      delete pairs[fullName];
    }
  });
  if (Object.keys(pairs).length > 0) {
    console.log('students without mentor', pairs);
  }
}

function normalizeGithubLink(url) {
  return url.trim().toLowerCase();
}

function normalizeScores(scoresArr) {
  const keys = scores.sheets['Form Responses 1'];
  const result = {};
  scoresArr.forEach(obj => {
    const mentorGithub = utils.getUserNameFromGithubLink(obj[keys.mentorGithub]);
    const studentGithub = utils.getUserNameFromGithubLink(obj[keys.studentGithub]);
    const taskName = obj[keys.taskName].trim();
    // const isExist = _.get(result, [mentorGithub, taskName, studentGithub], undefined);
    // if (isExist !== undefined) {
    //   console.log(mentorGithub, taskName, studentGithub);
    // }
    _.set(result, [mentorGithub, taskName, studentGithub], obj);
  }, {});
  return result;
}

// function filterByMentor(obj, fullName) {
//   return _.filter(obj, (mentor)=>mentor.)
// }

const data = getRawData();
data.peoples.pairs = normalizeRawPairs(data.peoples.pairs);

mergePairsToMentors(data.peoples['second_name-to_github_account'], data.peoples.pairs);

console.log('save out.json');
saveToJSON(data, 'out.json');

console.log('save scores-norm.json');
saveToJSON(normalizeScores(data.scores['Form Responses 1']), 'scores-norm.json');

console.log('exit');
process.exit();
