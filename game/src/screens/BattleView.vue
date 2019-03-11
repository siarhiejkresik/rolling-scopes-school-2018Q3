<template>
  <div class="battle shadow-lg rounded">
    <div class="stats rounded-top text-light p-3">
      <model-stats
        :name="player.name"
        :health="player.health"
        :health-max="player.healthMax"
        :is-right="false"
      />
      <div class="wins text-center">
        <div>Перамог</div>
        <div class="badge badge-info pt-2">
          {{ numOfWins }}
        </div>
      </div>
      <model-stats
        :name="enemy.name"
        :health="enemy.health"
        :health-max="enemy.healthMax"
        :is-right="true"
        class="text-right"
      />
    </div>

    <canvas
      id="canvas"
      ref="canvas"
      :width="canvas.width"
      :height="canvas.height"
      class="rounded-bottom"
    >
      <model
        :vertical-axis="canvas.width * player.verticalAxis"
        :bottom-line="canvas.height - player.bottomLine"
        :model="player.model"
        :scale="player.scale"
        class="player"
      />
      <model
        :vertical-axis="canvas.width * enemy.verticalAxis"
        :bottom-line="canvas.height - enemy.bottomLine"
        :model="enemy.model"
        :scale="enemy.scale"
        class="enemy"
      />
    </canvas>

    <spell-canvas
      :width="canvas.width"
      :height="canvas.height"
      :animation="spell.animation"
      :vertical-axis="spell.verticalAxis"
      :run-animation-trigger="spell.runAnimationTrigger"
      class="rounded-bottom"
    />

    <damage
      v-if="spell.showDamage"
      :damage="spell.power"
      :vertical-axis="spell.verticalAxis * canvas.width"
      :horizontal-axis="0.5 * canvas.height"
    />

    <game-message
      v-if="gameMessage.message"
      :options="gameMessage"
    />

    <b-button
      v-b-modal.spell-chooser-modal
      variant="success"
      size="lg"
      :disabled="spell.animation !== undefined || isLocked"
      class="spell"
    >
      Заклінанні
    </b-button>

    <b-modal
      id="spell-chooser-modal"
      title="Выберы заклінанне"
      ok-title="Выбраць"
      cancel-title="Назад"
      :centered="true"
      @spellSet="onSpellChange"
      @ok="onSpellSelected"
    >
      <spell-chooser :spells="spells" />
    </b-modal>

    <tasks
      v-model="task"
      @taskResult="onTaskResult"
    />

    <b-button
      class="exit text-light"
      variant="link"
      :disabled="isLocked"
      @click="gameEnd"
    >
      Выйсці
    </b-button>
  </div>
</template>

<script>
import getRandomName from '../scripts/MonsterName';
import { createRandomModel } from '../scripts/MonsterModel';

import ModelStats from '../components/ModelStats.vue';
import Model from '../components/Model.vue';
import SpellCanvas from '../components/SpellCanvas.vue';
import SpellChooser from '../components/SpellChooser.vue';
import Tasks from '../components/Tasks.vue';
import Damage from '../components/Damage.vue';
import GameMessage from '../components/GameMessage.vue';

import tasks from '../components/tasks';
import animations from '../scripts/animations';
import * as messages from './GameMessages';

import { decreaseNotOver, increaseNotOver, pause } from '../scripts/utils';

const SPELLS = [
  {
    name: 'Вада',
    // symbol: '🌊'
  },
  {
    name: 'Маланка',
    // symbol: '⚡'
  },
  {
    name: 'Агонь',
    // symbol: '🔥'
  },
  {
    name: 'Прырода',
    // symbol: '🍀'
  },
];

const HEALTH = 100;
const ENEMY_HEALTH_INCREMENT = 20;

const PLAYER_SCALE = 0.6;
const ENEMY_SCALE = 0.4;
const ENEMY_SCALE_INCREMENT = 0.1;
const ENEMY_SCALE_CEILING = 0.8;

const PLAYER_VERTICAL_AXIS = 1 / 5;
const ENEMY_VERTICAL_AXIS = 4 / 5;

const BOTTOM_LINE = 10;

const SPELL_POWER = 40;
const SPELL_DURATION = 5000;

const GAME_MESSAGE_DURATION = 2500;
const BEFORE_ANIMATION_DELAY = 500;

export default {
  components: {
    SpellCanvas,
    SpellChooser,
    Tasks,
    Model,
    ModelStats,
    Damage,
    GameMessage,
    ...tasks,
  },
  data() {
    return {
      enemy: {
        name: getRandomName(),
        health: HEALTH,
        healthMax: HEALTH,
        model: createRandomModel(),
        scale: ENEMY_SCALE,
        verticalAxis: ENEMY_VERTICAL_AXIS,
        bottomLine: BOTTOM_LINE,
      },
      player: {
        name: undefined,
        health: HEALTH,
        healthMax: HEALTH,
        model: createRandomModel(),
        scale: PLAYER_SCALE,
        verticalAxis: PLAYER_VERTICAL_AXIS,
        bottomLine: BOTTOM_LINE,
      },
      numOfWins: 0,
      spell: {
        current: undefined,
        power: SPELL_POWER,
        animation: undefined,
        runAnimationTrigger: false,
        verticalAxis: undefined,
        showDamage: false,
      },
      task: undefined,
      renderTrigger: false,
      canvas: {
        height: 700,
        width: 1200,
      },
      gameMessage: {},
      isLocked: true,
    };
  },
  computed: {
    ctx() {
      const ctx = this.$refs.canvas.getContext('2d');
      return ctx;
    },
  },
  created() {
    this.spells = SPELLS;
  },
  mounted() {
    this.player.name = this.$store.state.player.name;

    window.addEventListener('keydown', this.keyDown, true);

    this.startGame();
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyDown, true);
  },
  methods: {
    onSpellChange(spellName) {
      this.spell.current = spellName;
    },
    onSpellSelected() {
      if (!this.spell.current) {
        return;
      }
      switch (this.spell.current) {
        case SPELLS[0].name:
          this.task = tasks.Translation;
          this.spell.animation = animations.Raindrop;
          break;
        case SPELLS[1].name:
          this.task = tasks.Arithmethic;
          this.spell.animation = animations.Lightnings;
          break;
        case SPELLS[2].name:
          this.task = tasks.Sorting;
          this.spell.animation = animations.Fire;
          break;
        case SPELLS[3].name:
          this.task = tasks.Audition;
          this.spell.animation = animations.Lightnings;
          break;
        default:
          throw new Error('no such spell');
      }
    },
    onTaskResult(taskResult) {
      this.lock();
      if (taskResult) {
        this.onTaskSuccess();
      } else {
        this.onTaskFail();
      }
    },
    onTaskSuccess() {
      this.spell.verticalAxis = this.enemy.verticalAxis;
      this.triggerSpellAnimation();
      this.spell.showDamage = true;
      setTimeout(() => {
        this.spell.animation = undefined;
        this.enemy.health = decreaseNotOver(
          this.enemy.health,
          this.spell.power,
          0,
        );
        this.spell.showDamage = false;
        this.isEnemyDead();
      }, SPELL_DURATION);
    },
    onTaskFail() {
      this.spell.verticalAxis = this.player.verticalAxis;
      this.triggerSpellAnimation();
      this.spell.showDamage = true;
      setTimeout(() => {
        this.spell.animation = undefined;
        this.player.health = decreaseNotOver(
          this.player.health,
          this.spell.power,
          0,
        );
        this.spell.showDamage = false;
        this.isPlayerDead();
      }, SPELL_DURATION);
    },
    async isPlayerDead() {
      if (this.player.health > 0) {
        this.unlock();
        return;
      }
      await pause(BEFORE_ANIMATION_DELAY * 4);
      this.gameEnd();
    },
    async isEnemyDead() {
      if (this.enemy.health > 0) {
        this.unlock();
        return;
      }
      await pause(BEFORE_ANIMATION_DELAY);
      await this.showMessage(messages.winRound);
      this.numOfWins += 1;
      this.newRound();
    },
    async startGame() {
      await pause(BEFORE_ANIMATION_DELAY * 2);
      await this.showMessage(messages.startGame);
      await this.showNumberOfRoundMessage();
      await this.showEnemyMessage();
      await pause(BEFORE_ANIMATION_DELAY * 2);
      this.unlock();
    },
    async newRound() {
      this.lock();
      await pause(BEFORE_ANIMATION_DELAY);

      this.$store.dispatch('storage/setPlayerScore', this.numOfWins);

      this.enemy.healthMax += this.numOfWins * ENEMY_HEALTH_INCREMENT;
      this.enemy.health = this.enemy.healthMax;
      this.enemy.scale = increaseNotOver(
        this.enemy.scale,
        ENEMY_SCALE_INCREMENT,
        ENEMY_SCALE_CEILING,
      );
      this.enemy.name = getRandomName();
      this.enemy.model = createRandomModel();

      this.player.health = this.player.healthMax;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      await pause(BEFORE_ANIMATION_DELAY * 2);
      await this.showNumberOfRoundMessage();
      await this.showEnemyMessage();
      this.unlock();
    },
    async gameEnd() {
      this.lock();
      this.$store.commit('player/setLastScore', this.numOfWins);

      await this.showMessage(messages.endGame);

      this.$emit('showScores');
    },
    triggerSpellAnimation() {
      this.spell.runAnimationTrigger = !this.spell.runAnimationTrigger;
    },
    async showMessage(options) {
      const time = options.time || GAME_MESSAGE_DURATION;
      this.gameMessage = Object.assign({}, options);
      await pause(time);
      this.gameMessage = {};
    },
    async showNumberOfRoundMessage() {
      await this.showMessage(messages.roundNumber(this.numOfWins + 1));
    },
    async showEnemyMessage() {
      await this.showMessage(messages.enemyName(this.enemy.name));
    },
    lock() {
      this.isLocked = true;
    },
    unlock() {
      this.isLocked = false;
    },
    keyDown(e) {
      if (this.isLocked) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
  },
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  justify-content: center;
  align-items: center;
  background: rgb(23, 162, 184, 0.4);
  user-select: none;
}

.wins {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.5em;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
}

.badge {
  font-size: 1em;
}

canvas {
  position: absolute;
  bottom: 0;
}

#canvas {
  background: url("../assets/images/Background.png") repeat-x bottom;
}

button.spell {
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 0);
}

button.spell:not(:disabled) {
  box-shadow:
  0px 0 10px 0.1rem var(--secondary),
  0px 0 100px 0.1rem var(--secondary),
  0px 0 160px 0.1rem var(--secondary);
}

button.spell:focus {
  box-shadow:
  0px 0 10px 0.2rem rgba(255, 255, 255, 0.5),
  0px 0 100px 0.1rem var(--secondary),
  0px 0 160px 0.1rem var(--secondary);
}

button.exit {
  position: absolute;
  right: 0%;
  bottom: 0%;
}
</style>
