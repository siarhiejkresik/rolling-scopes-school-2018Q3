import { MAX_TIME } from './constants.js';

export const puzzlesNames = session => session.puzzles.map(puzzle => puzzle.name);

export const isCorrectCode = round => _.has(round, 'correct') && round.correct === 'Correct';

export const userRounds = (session, uid) => session.rounds.map(round => round.solutions[uid]);

export const userRoundTime = (round) => {
  if (isCorrectCode(round)) {
    const time = Number(round.time.$numberLong);
    if (time <= MAX_TIME) {
      return time;
    }
  }
  return MAX_TIME;
};

export const userSumTime = rounds => rounds.reduce((acc, round) => acc + userRoundTime(round), 0);

// TODO participants
export function* getUsersData({ users, session }) {
  for (const user of _.sortBy(users, ['displayName'])) {
    const rounds = userRounds(session, user.uid);
    yield {
      name: user.displayName,
      rounds,
      sumtime: userSumTime(rounds),
    };
  }
}

export const providerIdIntersection = (data) => {
  const arrs = Object.values(data)
    .map(o => o.users)
    .map(userInfo => userInfo.map(o => o.providerId));
  return _.intersection(...arrs);
};

export const getUserUidByProviderId = (users, providerId) => {
  const uid = users
    .filter(userInfo => userInfo.providerId === providerId)
    .map(userInfo => userInfo.uid);
  if (uid.lenght > 1) {
    throw new Error(`duplicated providerId ${providerId}`);
  }
  return uid[0];
};
