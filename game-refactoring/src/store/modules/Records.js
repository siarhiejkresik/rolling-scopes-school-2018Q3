const DEFAULT_RECORDS = [
  { playerName: 'Дзед', numOfWins: 6 },
  { playerName: 'Бабуля', numOfWins: 5 },
  { playerName: 'Тата', numOfWins: 4 },
  { playerName: 'Мама', numOfWins: 3 },
  { playerName: 'Сын', numOfWins: 2 },
  { playerName: 'Дачка', numOfWins: 1 }
];
const MAX_NUM_OF_RECORDS = 6;
const RECORDS_KEY = 'records';

// TODO: handle corrupt or of `old` format db

const loadFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key)) || DEFAULT_RECORDS;
};
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const state = {
  table: loadFromLocalStorage(RECORDS_KEY),
  maxNumOfRecords: MAX_NUM_OF_RECORDS,
  lastRecord: undefined
};

const getters = {
  isTableFull(state) {
    return getters.tableLength(state) === state.maxNumOfRecords;
  },
  isTableEmpty(state) {
    return getters.tableLength(state) === 0;
  },
  tableLength(state) {
    return state.table.length;
  },
  // TODO: rename; move to mutations?
  tableIndex(state, numOfWins) {
    if (getters.isTableEmpty(state)) {
      return 0;
    }
    return state.table.findIndex(record => numOfWins > record.numOfWins);
  }
};

const mutations = {
  checkForNewRecord(state, record) {
    if (!record.numOfWins) {
      mutations.forgetLastRecord(state);
      return;
    }

    let index = getters.tableIndex(state, record.numOfWins);

    if (index === -1) {
      if (getters.isTableFull(state)) {
        mutations.forgetLastRecord(state);
        return;
      } else {
        index = getters.tableLength(state);
      }
    }

    mutations.insertRecordAt(state, record, index);
    state.lastRecord = index;
    saveToLocalStorage(RECORDS_KEY, state.table);
  },
  insertRecordAt(state, record, index) {
    state.table.splice(index, 0, record);
    if (getters.tableLength(state) > state.maxNumOfRecords) {
      // TODO: maxNumOfRecords = 2, tableLength = 10 — ?
      state.table.pop();
    }
  },
  forgetLastRecord(state) {
    state.lastRecord = undefined;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
