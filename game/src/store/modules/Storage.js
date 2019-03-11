import { SERVER_ADDRESS, MAX_NUM_OF_RECORDS } from '../../configs';

const MIME_JSON = 'application/json';

const actions = {
  async getPlayer(context, playerName) {
    try {
      const body = JSON.stringify({ name: playerName });

      const res = await fetch(`${SERVER_ADDRESS}`, {
        method: 'POST',
        headers: {
          'Content-Type': MIME_JSON,
        },
        body,
      });

      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }

      const player = await res.json();
      const { name } = player;
      context.commit('player/setName', name, { root: true });

      return Promise.resolve(); // to satisfy eslinter
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async setPlayerScore(context, score) {
    const { name } = context.rootState.player;
    try {
      const body = JSON.stringify({ name, score });
      return await fetch(`${SERVER_ADDRESS}`, {
        method: 'PUT',
        headers: {
          'Content-Type': MIME_JSON,
        },
        body,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getScores(context, number = MAX_NUM_OF_RECORDS) {
    try {
      const body = JSON.stringify({ number });
      const res = await fetch(`${SERVER_ADDRESS}/scores`, {
        method: 'POST',
        headers: {
          'Content-Type': MIME_JSON,
        },
        body,
      });

      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }

      const scores = await res.json();
      return scores;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default {
  namespaced: true,
  actions,
};
