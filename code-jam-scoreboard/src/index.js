import data from './scripts/data.js';

console.log(data);
const SESSIONS = data['2018Q3'].session;
const USERS = data['2018Q3'].users;
console.log(SESSIONS);

const MAX_TIME = 150;
const MAX_CHART_LINES = 10;

const puzzlesNames = session => session.puzzles.map(puzzle => puzzle.name);

const isCorrectCode = round => _.has(round, 'correct') && round.correct === 'Correct';

const userRounds = (session, uid) => session.rounds.map(round => round.solutions[uid]);

const userRoundTime = (round) => {
  if (isCorrectCode(round)) {
    const time = Number(round.time.$numberLong);
    if (time <= MAX_TIME) {
      return time;
    }
  }
  return MAX_TIME;
};

const userSumTime = rounds => rounds.reduce((acc, round) => acc + userRoundTime(round), 0);

function* getUsersData(users, session) {
  for (const user of _.sortBy(users, ['displayName'])) {
    const rounds = userRounds(session, user.uid);
    yield {
      name: user.displayName,
      rounds,
      sumtime: userSumTime(rounds),
    };
  }
}

const createCell = (type, text = '', klass) => {
  const cell = document.createElement(type);
  cell.innerHTML = text;
  if (klass) {
    cell.classList.add(klass);
    console.log(klass);
  }
  return cell;
};

// TODO: split to createHead, createBody, createRow
const createTable = (session) => {
  const table = document.createElement('TABLE');

  // head

  let tag = 'TH';
  const headRow = table.createTHead().insertRow(0);
  // first cell
  headRow.appendChild(createCell(tag, 'Name'));
  // other cells
  puzzlesNames(session).forEach((name) => {
    headRow.appendChild(createCell(tag, name));
  });
  // sum time
  headRow.appendChild(createCell(tag, 'Time'));
  // checkbox
  headRow.appendChild(createCell(tag, 'Chart'));

  // body

  tag = 'TD';
  const body = table.createTBody();
  for (const userData of getUsersData(USERS, session)) {
    const bodyRow = body.insertRow();
    // name
    bodyRow.appendChild(createCell(tag, userData.name));
    // round times
    userData.rounds.forEach((round) => {
      const cell = createCell(tag, userRoundTime(round));
      cell.title = _.has(round, 'code') ? round.code : '';
      bodyRow.appendChild(cell);
    });
    // sum time
    bodyRow.appendChild(createCell(tag, userSumTime(userData.rounds), 'bold'));
    // checkbox
    const cell = createCell(tag);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    cell.appendChild(checkbox);
    bodyRow.appendChild(cell);
  }

  return table;
};

const renderTable = (session) => {
  const container = document.getElementById('table-container');
  container.innerHTML = null;
  container.appendChild(createTable(session));
  const chart = document.getElementById('myChart');
  chart.getContext('2d').clearRect(0, 0, chart.width, chart.height);

  const checkboxs = container.getElementsByTagName('input');

  // show chart on checkboxes toggle
  container.addEventListener('change', (e) => {
    const datasets = [];
    let checked = 0;
    Array.from(container.querySelector('tbody').children).forEach((row) => {
      if (row.querySelector('input').checked) {
        checked += 1;
        datasets.push({
          label: row.children[0].textContent,
          data: [...row.children].slice(1, 11).map(td => Number(td.textContent)),
        });
      }
    });
    showChart(session, datasets);

    if (checked === MAX_CHART_LINES) {
      [...container.querySelector('tbody').children].forEach((row) => {
        const checkbox = row.querySelector('input');
        if (!checkbox.checked) {
          checkbox.disabled = true;
        }
      });
    } else if (checked === MAX_CHART_LINES - 1) {
      [...container.querySelector('tbody').children].forEach((row) => {
        const checkbox = row.querySelector('input');
        if (checkbox.disabled) {
          checkbox.disabled = false;
        }
      });
    }
  });
};

const showChart = (session, datasets) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: puzzlesNames(session),
      datasets,
    },
  });
};

document.getElementById('session-selector').addEventListener('change', (e) => {
  const session = e.target.id;
  renderTable(SESSIONS[session]);
});
