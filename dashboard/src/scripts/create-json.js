/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const XLSX = require('xlsx');
const _ = require('lodash');
const utils = require('../components/utils');

const { XLSX_DIR, JSON_DIR, DATA_SCHEMES } = require('./constants');

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

function normalizeScores(scoresArr) {
  const keys = DATA_SCHEMES.scores.sheets['Form Responses 1'];
  const result = {};
  scoresArr.forEach(obj => {
    const mentorGithub = utils.getUserNameFromGithubLink(obj[keys.mentorGithub]);
    const studentGithub = utils.getUserNameFromGithubLink(obj[keys.studentGithub]);
    const taskName = obj[keys.taskName].trim();
    _.set(result, [mentorGithub, taskName, studentGithub], obj);
  }, {});
  return result;
}

function main() {
  const data = AllXLSXsToJSON();
  data.peoples.pairs = normalizeRawPairs(data.peoples.pairs);

  mergePairsToMentors(data.peoples['second_name-to_github_account'], data.peoples.pairs);

  console.log('save out.json');
  saveToJSON(data, JSON_DIR, 'out.json');

  console.log('save scores-norm.json');
  saveToJSON(normalizeScores(data.scores['Form Responses 1']), JSON_DIR, 'scores-norm.json');

  console.log('done');
}

main();
