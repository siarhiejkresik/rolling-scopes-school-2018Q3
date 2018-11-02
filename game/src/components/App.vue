<template>
  <main id="app">
    <landing-view
      v-if="view === 'LANDING'"
      @startGame='onStartGame'
      @showScores='onShowScores'>
    </landing-view>
    <loading-view
      v-else-if="view === 'LOADING'"
      @loaded='onLoaded'>
    </loading-view>
    <login-view
      v-else-if="view === 'LOGIN'"
      @logIn='onLogIn'>
    </login-view>
    <battle-view
      v-else-if="view === 'BATTLE'"
      @exitGame='onExitGame'
      @showScores='onShowScores'>
    </battle-view>
    <scores-view
      v-else-if="view === 'SCORES'"
      @exitGame='onExitGame'>
    </scores-view> 
  </main>
</template>

<script>
import BattleView from './BattleView.vue';
import LandingView from './LandingView.vue';
import LoadingView from './LoadingView.vue';
import LoginView from './LoginView.vue';
import ScoresView from './ScoresView.vue';

export default {
  name: 'app',
  components: {
    BattleView,
    LandingView,
    LoadingView,
    LoginView,
    ScoresView
  },
  data() {
    return {
      // view: 'BATTLE'
      view: 'LANDING'
    };
  },
  computed: {
    isLoaded() {
      return this.$store.state.assets.isLoaded;
    }
  },
  methods: {
    onStartGame() {
      if (!this.isLoaded) {
        this.view = 'LOADING';
        return;
      }
      this.$store.state.player.name === undefined ? (this.view = 'LOGIN') : (this.view = 'BATTLE');
    },
    onExitGame() {
      this.view = 'LANDING';
    },
    onShowScores() {
      this.view = 'SCORES';
    },
    onLoaded() {
      this.onStartGame();
    },
    onLogIn(playerName) {
      this.$store.commit('player/setName', playerName);
      this.view = 'BATTLE';
    }
  },
  mounted: function() {
    this.$store.dispatch('assets/load');
  }
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: repeating-linear-gradient(45deg, #dedede 2px, #dadada 3px, #dadada 4px, #dedede 7px);
}
</style>
