<template>
  <section>
    <div class="header">
      <div>Перамог: {{ numOfMobs }}</div>
      <b-button @click="onTaskSuccess">Win!</b-button>
      <b-button @click="onTaskFail">Lose!</b-button>
      <b-button class="exit shadow-lg" @click="gameEnd">Закончыць</b-button>
    </div>
    
    <div class="stats">
      <player-stats :name="playerName" :health="healthPlayer"></player-stats>
      <player-stats :name="mobName" :health="healthMob"></player-stats>
    </div>

    <canvas id="canvas" ref="canvas" width="1200" height="600"></canvas>
    <mob :vertical-axis=250 :bottom-line=230 class="player"></mob>
    <mob :vertical-axis=1200-250 :bottom-line=230 class="enemy"></mob>

    <b-button v-b-modal.spell-chooser size="lg" class="spell">Заклінанні</b-button>
    <b-modal
      title="Выберы заклінанне" 
      ok-title="Выбраць"
      cancel-title="Назад"
      :centered=true
      @spellSet="onSpellChange"
      @ok="onSpellSelected"
      id="spell-chooser">
      <spell-chooser :spells="spells"></spell-chooser>
     </b-modal>

    <b-modal
      class=""
      ok-title="Адказаць"
      cancel-title="Здацца"
      cancel-variant="danger"
      :no-close-on-backdrop=true
      :no-close-on-esc=true
      :hide-header-close=true
      :centered=true
      :title="taskStatuses[currentTaskStatus].title" 
      :header-bg-variant="taskStatuses[currentTaskStatus].headerBg"
      :header-text-variant="taskStatuses[currentTaskStatus].headerText"
      :busy="taskStatuses[currentTaskStatus].busy"
      v-model="showTask"
      @answerChanged="onTaskAnswerChange"
      @ok="onTaskAnswerSelected"
      @cancel="onTaskFail"
      ref="tasks">
      <component :is="currentTask" :create-new-task-trigger="newTaskTrigger"></component>
     </b-modal>

  </section>
</template>

<script>
import getRandomName from '../scripts/Monster.js';

import Player from './Player.vue';
import PlayerStats from './PlayerStats.vue';
import Mob from './Mob.vue';
import SpellChooser from './SpellChooser.vue';

import Arithmethic from './tasks/Arithmethic.vue';
import Audition from './tasks/Audition.vue';
import Sorting from './tasks/Sorting.vue';
import Translation from './tasks/Translation.vue';

const spells = [
  {
    name: 'Агонь',
    symbol: '🔥 '
  },
  {
    name: 'Вада',
    symbol: '🌊 '
  },
  {
    name: 'Прырода',
    symbol: '🍀'
  },
  {
    name: 'Вецер',
    symbol: '🌀'
  }
];

const taskStatuses = {
  success: {
    headerBg: 'success',
    headerText: 'light',
    title: 'Правільна!',
    busy: true
  },
  fail: {
    headerBg: 'danger',
    headerText: 'light',
    title: 'Няправільна!',
    busy: true
  },
  neutral: {
    headerBg: 'info',
    headerText: 'light',
    title: 'Заданне',
    busy: false
  }
};

export default {
  components: {
    SpellChooser,
    Mob,
    Player,
    PlayerStats,
    Arithmethic,
    Audition,
    Sorting,
    Translation
  },
  data() {
    return {
      healthPlayer: 100,
      healthMob: 100,
      numOfMobs: 0,
      spellMight: 100,
      spells: spells,
      currentSpell: undefined,
      currentTask: undefined,
      taskStatuses: taskStatuses,
      currentTaskStatus: 'neutral',
      isCurrentTaskRightAnswer: false,
      newTaskTrigger: false,
      showTask: false
    };
  },
  computed: {
    ctx() {
      let ctx = this.$refs.canvas.getContext('2d');
      return ctx;
    },
    playerName() {
      return this.$store.state.player.name;
    },
    mobName() {
      return getRandomName();
    }
  },
  methods: {
    onSpellChange(spellName) {
      this.currentSpell = spellName;
    },
    onSpellSelected() {
      if (!this.currentSpell) {
        return;
      }
      // choose task
      this.newTaskTrigger = !this.newTaskTrigger;
      switch (this.currentSpell) {
        case this.spells[0].name:
          this.currentTask = 'Translation';
          break;
        case this.spells[1].name:
          this.currentTask = 'Arithmethic';
          break;
        case this.spells[2].name:
          this.currentTask = 'Sorting';
          break;
        case this.spells[3].name:
          this.currentTask = 'Audition';
          break;
      }
      // show modal with the current task
      this.currentTaskStatus = 'neutral';
      this.showTask = true;
    },
    onTaskAnswerChange(value) {
      this.isCurrentTaskRightAnswer = value;
      if (process.env.NODE_ENV !== 'production') {
        console.log('BATTLE: is a changed answer correct?', value);
      }
    },
    onTaskAnswerSelected(event) {
      event.preventDefault();
      setTimeout(() => {
        this.showTask = false;
        this.isCurrentTaskRightAnswer ? this.onTaskSuccess() : this.onTaskFail();
      }, 2000);
      this.isCurrentTaskRightAnswer
        ? (this.currentTaskStatus = 'success')
        : (this.currentTaskStatus = 'fail');
    },
    onTaskSuccess() {
      //TODO:
      this.healthMob = this.healthMob - this.spellMight < 0 ? 0 : this.healthMob - this.spellMight;
      this.isEnemyDead();
    },
    onTaskFail() {
      //TODO:
      this.healthPlayer =
        this.healthPlayer - this.spellMight < 0 ? 0 : this.healthPlayer - this.spellMight;
      this.isPlayerDead();
    },
    isPlayerDead() {
      if (this.healthPlayer === 0) {
        this.gameEnd();
      }
    },
    isEnemyDead() {
      if (this.healthMob === 0) {
        this.healthMob = 100 + this.numOfMobs * 0;
        this.numOfMobs += 1;
      }
    },
    gameEnd() {
      this.$store.commit('records/checkForNewRecord', {
        playerName: this.playerName,
        numOfMobs: this.numOfMobs
      });
      this.$emit('showScores');
    }
  }
};
</script>

<style scoped>
section {
  width: 1200px;
  height: 800px;
  outline: 5px red solid;
  margin: 0 auto;
  position: relative;
}

.stats {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: red;
  outline: 2px green solid;
  background: rgba(205, 92, 92, 0.521);
}

.header {
  height: 100px;
}

canvas {
  background: url('../assets/images/Background.png') repeat-x fixed bottom;
  outline: 3px blue solid;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}

button {
  display: block;
}

button.spell {
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 0);
}

button.exit {
  position: absolute;
  right: 2%;
  top: 2%;
}
</style>
