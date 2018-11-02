<template>
  <main id="app">
  <transition name="fade" mode="out-in">
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
  </transition>    
  </main>
</template>

<script>
import views from './views.js';

export default {
  name: 'app',
  components: {
    ...views
  },
  data() {
    return {
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
@import url('../assets/styles/latofonts.css');
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
  font-family: Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.fade-enter-active {
  transition: all 0.8s ease-out;
}
.fade-leave-active {
  transition: all 0.8s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
