<template>
  <div class="battle shadow-lg rounded">
    <div class="stats rounded-top text-light p-3">
      <model-stats
        :name="player.name"
        :health="player.health"
        :healthMax="player.healthMax"
        :isRight=false></model-stats>
      <div class="wins text-center">
        <div>Перамог</div>
        <div class="badge badge-info pt-2">{{ numOfWins }}</div>
      </div>
      <model-stats
        :name="enemy.name"
        :health="enemy.health"
        :healthMax="enemy.healthMax"
        :isRight=true
        class="text-right"></model-stats>
    </div>

    <canvas
      id="canvas"
      ref="canvas"
      :width="canvas.width"
      :height="canvas.height"
      class="rounded-bottom">
        <model
          :vertical-axis="canvas.width * 1/5"
          :bottom-line="canvas.height-10"
          :model="player.model"
          :scale="player.scale"
          :renderTrigger="renderTrigger"
          class="player"></model>
        <model
          :vertical-axis="canvas.width * 4/5"
          :bottom-line="canvas.height-10"
          :model="enemy.model"
          :scale="enemy.scale"
          :renderTrigger="renderTrigger"
          class="enemy"></model>
    </canvas>

    <spell-canvas
      :width="canvas.width" :height="canvas.height"
      :animation="spell.animation"
      :verticalAxis="spell.verticalAxis"
      :runAnimationTrigger="spell.runAnimationTrigger"
      class="rounded-bottom"></spell-canvas>

    <b-button class="exit text-light" variant="link" @click="gameEnd">Выйсці</b-button>
    <b-button
      v-b-modal.spell-chooser
      variant="outline" size="lg"
      :disabled="spell.animation !== undefined"
      class="spell">Заклінанні</b-button>
    <b-modal
      title="Выберы заклінанне" 
      ok-title="Выбраць" cancel-title="Назад"
      :centered=true
      @spellSet="onSpellChange"
      @ok="onSpellSelected"
      id="spell-chooser">
      <spell-chooser :spells="spells"></spell-chooser>
     </b-modal>

    <b-modal
      ok-title="Адказаць" cancel-title="Здацца" cancel-variant="danger"
      :no-close-on-backdrop=true
      :no-close-on-esc=true
      :hide-header-close=true
      :centered=true
      :title="taskStatuses[task.status].title" 
      :header-bg-variant="taskStatuses[task.status].headerBg"
      :header-text-variant="taskStatuses[task.status].headerText"
      :busy="taskStatuses[task.status].busy"
      v-model="task.showTask"
      @answerChanged="onTaskAnswerChange"
      @ok="onTaskAnswerSelected"
      @cancel="onTaskFail"
      ref="tasks">
      <component
        :is="task.current"
        :create-new-task-trigger="task.newTaskTrigger"></component>
     </b-modal>

  </div>
</template>

<script>
import getRandomName from '../scripts/MonsterName.js';
import { createRandomModel } from '../scripts/MonsterModel.js';

import ModelStats from './ModelStats.vue';
import Model from './Model.vue';
import SpellCanvas from './SpellCanvas.vue';
import SpellChooser from './SpellChooser.vue';

import * as tasks from './tasks/index.js';
import * as animations from '../scripts/Animations/index.js';

import { decreaseNotOver, increaseNotOver } from '../scripts/utils.js';

// TODO: we need an another way to show spell images
const spells = [
  {
    name: 'Вада'
    // symbol: '🌊'
  },
  {
    name: 'Маланка'
    // symbol: '⚡'
  },
  {
    name: 'Агонь'
    // symbol: '🔥'
  },
  {
    name: 'Прырода'
    // symbol: '🍀'
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
    SpellCanvas,
    SpellChooser,
    Model,
    ModelStats,
    ...tasks
  },
  data() {
    return {
      enemy: {
        name: getRandomName(),
        health: 100,
        healthMax: 100,
        model: createRandomModel(),
        scale: 0.4
      },
      player: {
        name: undefined,
        health: 100,
        healthMax: 100,
        model: createRandomModel(),
        scale: 0.6
      },
      numOfWins: 0,
      spells: spells,
      spell: {
        current: undefined,
        power: 40,
        animation: undefined,
        runAnimationTrigger: false,
        verticalAxis: undefined
      },
      taskStatuses: taskStatuses,
      task: {
        current: undefined,
        status: 'neutral',
        isRightAnswer: false,
        newTaskTrigger: false,
        showTask: false
      },
      renderTrigger: false,
      canvas: {
        height: 700,
        width: 1200
      }
    };
  },
  computed: {
    _dev_mode() {
      return process.env.NODE_ENV !== 'production';
    },
    ctx() {
      let ctx = this.$refs.canvas.getContext('2d');
      return ctx;
    }
  },
  methods: {
    onSpellChange(spellName) {
      this.spell.current = spellName;
    },
    onSpellSelected() {
      if (!this.spell.current) {
        return;
      }
      // TODO: rework this ugly method
      // choose task
      this.task.newTaskTrigger = !this.task.newTaskTrigger;
      switch (this.spell.current) {
        case this.spells[0].name:
          this.task.current = 'Translation';
          this.spell.animation = animations.Raindrop;
          break;
        case this.spells[1].name:
          this.task.current = 'Arithmethic';
          this.spell.animation = animations.Lightnings;
          break;
        case this.spells[2].name:
          this.task.current = 'Sorting';
          this.spell.animation = animations.Fire;
          break;
        case this.spells[3].name:
          this.task.current = 'Audition';
          this.spell.animation = animations.Lightnings;
          break;
      }
      // show modal with the current task
      this.task.isRightAnswer = false;
      this.task.status = 'neutral';
      this.task.showTask = true;
    },
    onTaskAnswerChange(value) {
      this.task.isRightAnswer = value;
      if (this._dev_mode) {
        console.log('BATTLE: is a changed answer correct?', value);
      }
    },
    onTaskAnswerSelected(event) {
      event.preventDefault();
      setTimeout(() => {
        this.task.showTask = false;
        this.task.isRightAnswer ? this.onTaskSuccess() : this.onTaskFail();
      }, 2000);
      this.task.isRightAnswer ? (this.task.status = 'success') : (this.task.status = 'fail');
    },
    onTaskSuccess() {
      this.spell.verticalAxis = 4 / 5;
      this.spell.runAnimationTrigger = !this.spell.runAnimationTrigger;
      setTimeout(() => {
        this.spell.animation = undefined;
        this.enemy.health = decreaseNotOver(this.enemy.health, this.spell.power, 0);
        this.isEnemyDead();
      }, 5000);
    },
    onTaskFail() {
      this.spell.verticalAxis = 1 / 5;
      this.spell.runAnimationTrigger = !this.spell.runAnimationTrigger;
      setTimeout(() => {
        this.spell.animation = undefined;
        this.player.health = decreaseNotOver(this.player.health, this.spell.power, 0);
        this.isPlayerDead();
      }, 5000);
    },
    isPlayerDead() {
      if (this.player.health === 0) {
        this.gameEnd();
      }
    },
    isEnemyDead() {
      if (this.enemy.health === 0) {
        this.numOfWins += 1;
        this.newRound();
      }
    },
    newRound() {
      this.enemy.healthMax += this.numOfWins * 20;
      this.enemy.health = this.enemy.healthMax;
      this.enemy.scale = increaseNotOver(this.enemy.scale, 0.1, 0.8);
      this.enemy.name = getRandomName();
      this.enemy.model = createRandomModel();

      this.player.health = this.player.healthMax;

      this.ctx.clearRect(0, 0, 1200, 700);
      this.renderTrigger = !this.renderTrigger;
    },
    gameEnd() {
      this.$store.commit('records/checkForNewRecord', {
        playerName: this.player.name,
        numOfWins: this.numOfWins
      });
      this.$emit('showScores');
    }
  },
  mounted: function() {
    this.player.name = this.$store.state.player.name;
  }
};
</script>

<style scoped>
.battle {
  position: relative;
  width: 1200px;
  height: 820px;
}

.stats {
  position: relative;
  width: 100%;
  /* height: 100px; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  justify-content: center;
  align-items: center;
  background: rgb(23, 162, 184, 0.4);
}

.wins {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.5em;
}

.badge {
  font-size: 1em;
}

canvas {
  position: absolute;
  bottom: 0;
}

#canvas {
  background: url('../assets/images/Background.png') repeat-x bottom;
}

button.spell {
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 0);
}

button.exit {
  position: absolute;
  right: 0%;
  bottom: 0%;
}
</style>
