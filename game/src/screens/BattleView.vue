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
        :render-trigger="renderTrigger"
        class="player"
      />
      <model
        :vertical-axis="canvas.width * enemy.verticalAxis"
        :bottom-line="canvas.height - enemy.bottomLine"
        :model="enemy.model"
        :scale="enemy.scale"
        :render-trigger="renderTrigger"
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

    <b-button
      class="exit text-light"
      variant="link"
      @click="gameEnd"
    >
      Выйсці
    </b-button>

    <b-button
      v-b-modal.spell-chooser
      variant="success"
      size="lg"
      :disabled="spell.animation !== undefined"
      class="spell"
    >
      Заклінанні
    </b-button>

    <b-modal
      id="spell-chooser"
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

import tasks from '../components/tasks';
import animations from '../scripts/animations';

import { decreaseNotOver, increaseNotOver } from '../scripts/utils';

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

const SPELL_POWER = 400;
const SPELL_DURATION = 5000;

export default {
  components: {
    SpellCanvas,
    SpellChooser,
    Tasks,
    Model,
    ModelStats,
    Damage,
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
      }
    },
    onTaskResult(taskResult) {
      taskResult ? this.onTaskSuccess() : this.onTaskFail();
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
      this.triggerRendering();
    },
    gameEnd() {
      this.$store.commit('player/setLastScore', this.numOfWins);
      this.$emit('showScores');
    },
    triggerRendering() {
      this.renderTrigger = !this.renderTrigger;
    },
    triggerSpellAnimation() {
      this.spell.runAnimationTrigger = !this.spell.runAnimationTrigger;
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
  text-shadow: 0 1px 1px rgba(0,0,0,.12);
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

button.spell:focus {
  box-shadow: 0px 0 30px 0.1rem var(--secondary);
}

button.exit {
  position: absolute;
  right: 0%;
  bottom: 0%;
}
</style>
