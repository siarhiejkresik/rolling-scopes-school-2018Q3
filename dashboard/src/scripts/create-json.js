/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const XLSX = require('xlsx');
const _ = require('lodash');
const { getNameFromGithubLink } = require('./utils');

const { XLSX_DIR, JSON_DIR, JSON_FILE_NAME, SHEET_NAMES, DATA_SCHEMES } = require('./constants');

function XLSXFileToWorkBook(fileName) {
  return XLSX.readFile(path.join(__dirname, XLSX_DIR, fileName));
}

function workBookSheetToJSON(workBook, sheetName) {
  return XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
}

function AllWorkBookSheetsToJSON(workBook, sheetNames) {
  return _.mapValues(sheetNames, (obj, sheetName) => workBookSheetToJSON(workBook, sheetName));
}

function AllXLSXsToJSON(schemas = DATA_SCHEMES) {
  return _.mapValues(schemas, schema => {
    const workBook = XLSXFileToWorkBook(schema.file);
    return AllWorkBookSheetsToJSON(workBook, schema.sheets);
  });
}

function saveToJSON(obj, relativePath, fileName) {
  const file = path.resolve(path.join(relativePath, fileName));
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

function normalizeRawPairs(pairs) {
  // group by mentor
  const result = _.groupBy(pairs, obj => obj.interviewer);
  // for each mentor collect students to an array
  _.forEach(result, (arr, mentor) => {
    result[mentor] = _.sortBy(
      arr.map(obj => String(obj[DATA_SCHEMES.peoples.sheets.pairs.studentGithub] || '').trim())
    );
  });
  return result;
}

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
    console.log('students without mentor:', pairs);
  }
}

function normalizeScores(scoresArr) {
  const keys = DATA_SCHEMES.scores.sheets[SHEET_NAMES.scores];
  const result = {};
  scoresArr.forEach(obj => {
    const mentorGithub = getNameFromGithubLink(obj[keys.mentorGithub]);
    const studentGithub = getNameFromGithubLink(obj[keys.studentGithub]);
    const taskName = obj[keys.taskName].trim();
    _.set(result, [mentorGithub, taskName, studentGithub], obj);
  }, {});
  return result;
}

function normalizeTasks(tasksArr) {
  return tasksArr.map(task_ => ({ ...task_, task: task_.task.trim() }));
}

function main() {
  const data = AllXLSXsToJSON();

  data.peoples.pairs = normalizeRawPairs(data.peoples.pairs);
  mergePairsToMentors(data.peoples[SHEET_NAMES.mentorData], data.peoples.pairs);
  const mentors = data.peoples[SHEET_NAMES.mentorData];
  const scores = normalizeScores(data.scores[SHEET_NAMES.scores]);
  const tasks = normalizeTasks(data.tasks.Sheet1);

  console.log(`save ${JSON_FILE_NAME}`);
  saveToJSON({ tasks, mentors, scores }, JSON_DIR, JSON_FILE_NAME);
  console.log('done');
}

main();
