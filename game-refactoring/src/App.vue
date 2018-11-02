<template>
  <main id="app">
  <transition name="fade" mode="out-in">
    <menu-view
      v-if="view === VIEWS.MENU"
      @startGame='onStartGame'
      @showScores='onShowScores'>
    </menu-view>
    <loading-view
      v-else-if="view === VIEWS.LOADING"
      message="ПАЧАКАЙЦЕ"
      @loaded='onLoaded'>
    </loading-view>
    <login-view
      v-else-if="view === VIEWS.LOGIN"
      @logIn='onLogIn'>
    </login-view>
    <battle-view
      v-else-if="view === VIEWS.BATTLE"
      @exitGame='onExitGame'
      @showScores='onShowScores'>
    </battle-view>
    <scores-view
      v-else-if="view === VIEWS.SCORES"
      @exitGame='onExitGame'>
    </scores-view> 
  </transition>    
  </main>
</template>

<script>
import screens from './screens/index.js';

const VIEWS = {
  MENU: 0,
  LOADING: 1,
  LOGIN: 2,
  BATTLE: 3,
  SCORES: 4
};

export default {
  name: 'app',
  components: {
    ...screens
  },
  data() {
    return {
      view: undefined
    };
  },
  computed: {
    isLoaded() {
      return this.$store.state.assets.isLoaded;
    },
    isLoggedIn() {
      return this.$store.state.player.name !== undefined;
    }
  },
  methods: {
    onStartGame() {
      if (!this.isLoggedIn) {
        this.view = this.VIEWS.LOGIN;
        return;
      }
      if (!this.isLoaded) {
        this.view = this.VIEWS.LOADING;
        return;
      }
      this.view = this.VIEWS.BATTLE;
    },
    onExitGame() {
      this.view = this.VIEWS.MENU;
    },
    onShowScores() {
      this.view = this.VIEWS.SCORES;
    },
    onLogIn(playerName) {
      this.$store.commit('player/setName', playerName);
      this.onStartGame();
    }
  },
  watch: {
    isLoaded: function() {
      if (this.isLoaded && this.view === this.views.LOADING) {
        this.onStartGame();
      }
    }
  },
  created: function() {
    this.VIEWS = VIEWS;
    this.view = VIEWS.MENU;
  },
  mounted: function() {
    this.$store.dispatch('assets/load');
  }
};
</script>

<style>
@import url('./assets/styles/latofonts.css');
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
