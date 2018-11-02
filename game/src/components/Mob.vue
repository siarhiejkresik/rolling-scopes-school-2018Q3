<template>
</template>

<script>
import { randomObjectElement } from '../scripts/utils.js';
import getRandomName from '../scripts/Monster.js';
import parts from '../assets/images/models/parts.json';
import { MonsterModel } from '../scripts/MonsterModel.js';

export default {
  props: {
    verticalAxis: Number,
    bottomLine: Number
  },
  computed: {
    name() {
      return getRandomName();
    },
    ctx() {
      return this.$parent.ctx; // TODO: bad
    }
  },
  mounted: function() {
    // console.log('mounted mob', this.ctx);
    // let model = new MonsterModel();
    // this.model.loadAtlases();
    // this.model.createRandomMonster();

    const skin = randomObjectElement(parts.skin);
    const shirtsArm = randomObjectElement(parts.shirts.arm);
    const shoes = randomObjectElement(parts.shoes);
    const shirt = randomObjectElement(parts.shirts.shirt);
    const hair = randomObjectElement(parts.hair.man);
    const pantsLeg = randomObjectElement(parts.pants.leg);
    const pants = randomObjectElement(parts.pants.pants);

    const shirtsArmOffsets = {
      x: { long: 125, shorter: 85, short: 105 },
      y: 217
    };
    const skinHandOffsets = { x: 200, y: 320 };
    const skinArmOffsets = { x: 120, y: 216 };
    const skinLegOffsets = { x: 52, y: 410 };

    const pantsLegOffsets = { x: 52, y: 400 };
    const pantsOffsets = { x: 0, y: 384 };

    const shoesOffsets = { x: 84, y: 555 };
    const shirtOffsets = { x: 0, y: 217 };

    const headOffsets = { x: 0, y: 50 };
    const hairOffsets = { x: 0, y: 30 };
    const neckOffsets = { x: 0, y: 210 };

    this.drawElement(skin.arm, skinArmOffsets);
    this.drawElement(skin.arm, skinArmOffsets, true);
    this.drawElement(skin.leg, skinLegOffsets);
    this.drawElement(skin.leg, skinLegOffsets, true);
    this.drawElement(skin.hand, skinHandOffsets);
    this.drawElement(skin.hand, skinHandOffsets, true);
    this.drawElement(
      shirtsArm,
      { x: shirtsArmOffsets.x[shirtsArm.length], y: shirtsArmOffsets.y },
      true
    );
    this.drawElement(shirtsArm, { x: shirtsArmOffsets.x[shirtsArm.length], y: shirtsArmOffsets.y });
    // this.drawNeck(skin.neck);
    this.drawElement(skin.neck, neckOffsets);
    // this.drawHead(skin.head);
    this.drawElement(skin.head, headOffsets);
    this.drawElement(parts.face.face.face1, { x: 0, y: 95 });
    // this.drawHair(hair);
    this.drawElement(hair, hairOffsets);
    // this.drawShirt(shirt);
    this.drawElement(shirt, shirtOffsets);
    this.drawElement(pantsLeg, pantsLegOffsets);
    this.drawElement(pantsLeg, pantsLegOffsets, true);
    this.drawElement(shoes, shoesOffsets);
    this.drawElement(shoes, shoesOffsets, true);
    this.drawElement(pants, pantsOffsets);

  },
  methods: {
    drawElement(element, offsets, mirror = false, scale = 0.6) {
      let img = new Image();
      img.onload = () => {
        this.ctx.save();
        if (mirror) {
          this.ctx.scale(-1, 1);
          this.ctx.translate(-2 * this.verticalAxis, 0);
        }
        this.ctx.drawImage(
          img,
          element.x,
          element.y,
          element.width,
          element.height,
          this.verticalAxis + offsets.x * scale - element.width * scale / 2,
          this.bottomLine + offsets.y * scale,
          element.width * scale,
          element.height * scale
        );
        this.ctx.restore();
      };
      img.src = require('../assets/images/models/' + element.file);
    },
    drawMob() {
      this.model.parts.forEach(part => {
        const img = this.model.images[part];
        const options = this.model.options[part];
        this.drawElement(img, options);
      });
    },

    // drawHead(part) {
    //   this.drawElement(part, headOffsets);
    // },

    // drawShirt(part) {
    //   this.drawElement(part, shirtOffsets);
    // },
    // drawHair(part) {
    //   this.drawElement(part, hairOffsets);
    // },
    // drawNeck(part) {
    //   this.drawElement(part, neckOffsets);
    // }
  }
};
</script>