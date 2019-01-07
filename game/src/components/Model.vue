<script>

export default {
  props: {
    verticalAxis: Number,
    bottomLine: Number,
    model: Object,
    scale: Number,
  },
  data() {
    return {
      date: null,
      breathDir: true,
      breathDur: 1000,
      breathMax: 8,
      breathOffset: 0,
    };
  },
  computed: {
    breathInt() {
      return this.breathDur / this.breathMax;
    },
    ctx() {
      return this.$parent.ctx; // TODO: bad
    },
    modelResources() {
      return this.$store.state.assets.resources.model;
    },
  },
  mounted() {
    this.draw();
  },
  methods: {
    clear() {
      this.ctx.clearRect(this.verticalAxis - 500, 0, 800, 1000);
    },
    draw() {
      this.clear();

      // set begin date
      if (this.date === null) {
        this.date = Date.now();
      }

      const date = Date.now();
      if (date - this.date > this.breathInt) {
        this.date = date;
        // change offset
        if (this.breathDir) {
          this.breathOffset++;
        } else {
          this.breathOffset--;
        }
        // change direction
        if (this.breathOffset === 0 || this.breathOffset === this.breathMax) {
          this.breathDir = !this.breathDir;
        }
      }

      // offsets
      const shoesOffsets = { x: 86, y: -this.model.shoes.height };

      const skinLegOffsets = {
        x: 52,
        y: -this.model.shoes.height - this.model.skin.leg.height + 15,
      };
      const pantsOffsets = { x: 0, y: skinLegOffsets.y - this.model.pants.height + 20 };
      const pantsLegOffsets = { x: 52, y: pantsOffsets.y + 20 };
      const shirtOffsets = { x: 0, y: pantsOffsets.y - this.model.shirt.height + 10 + this.breathOffset };
      const shirtsArmOffsets = {
        x: { long: 125, shorter: 80, short: 105 },
        y: shirtOffsets.y,
      };
      const skinArmOffsets = { x: 120, y: shirtOffsets.y };
      const skinHandOffsets = { x: 200, y: skinArmOffsets.y + 100 };

      const neckOffsets = { x: 0, y: shirtOffsets.y - this.model.skin.neck.height + 30 };
      const headOffsets = { x: 0, y: neckOffsets.y - this.model.skin.head.height + 10 };
      const hairOffsets = {
        x: this.model.hair.width > 160 ? 8 : 0, // TODO: hardcoded
        y: headOffsets.y + Math.trunc(this.model.skin.head.height / 2) - this.model.hair.height + 15,
      };
      const faceOffsets = {
        x: 0,
        y: headOffsets.y + Math.trunc(this.model.skin.head.height / 2) - Math.trunc(this.model.face.height / 2) + 10,
      };

      // draw parts
      this.drawElement(this.model.skin.arm, skinArmOffsets);
      this.drawElement(this.model.skin.arm, skinArmOffsets, true);
      this.drawElement(this.model.skin.leg, skinLegOffsets);
      this.drawElement(this.model.skin.leg, skinLegOffsets, true);
      this.drawElement(this.model.skin.hand, skinHandOffsets);
      this.drawElement(this.model.skin.hand, skinHandOffsets, true);
      this.drawElement(
        this.model.shirtsArm,
        { x: shirtsArmOffsets.x[this.model.shirtsArm.length], y: shirtsArmOffsets.y },
        true,
      );
      this.drawElement(this.model.shirtsArm, {
        x: shirtsArmOffsets.x[this.model.shirtsArm.length],
        y: shirtsArmOffsets.y,
      });
      this.drawElement(this.model.skin.neck, neckOffsets);
      this.drawElement(this.model.skin.head, headOffsets);
      this.drawElement(this.model.face, faceOffsets);
      this.drawElement(this.model.hair, hairOffsets);
      this.drawElement(this.model.shirt, shirtOffsets);
      this.drawElement(this.model.shoes, shoesOffsets);
      this.drawElement(this.model.shoes, shoesOffsets, true);
      this.drawElement(this.model.pantsLeg, pantsLegOffsets);
      this.drawElement(this.model.pantsLeg, pantsLegOffsets, true);
      this.drawElement(this.model.pants, pantsOffsets);

      requestAnimationFrame(this.draw);
    },
    drawElement(element, offsets, mirror = false) {
      const img = this.modelResources[element.file];
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
        this.verticalAxis + offsets.x * this.scale - Math.trunc(element.width * this.scale / 2),
        this.bottomLine + offsets.y * this.scale,
        element.width * this.scale,
        element.height * this.scale,
      );
      this.ctx.restore();
    },
  },
};
</script>
