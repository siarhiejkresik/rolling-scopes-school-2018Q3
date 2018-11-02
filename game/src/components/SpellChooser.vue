<template>
  <div>
    <b-radio-group id="spells"
      buttons
      stacked
      v-model="selected"
      button-variant="outline-secondary"
      size="lg"
      :options="options"
      name="radioBtnStacked" 
      class="btn-block"/>
  </div> 
</template>

<script>
export default {
  props: ['spells'],
  data() {
    return {
      selected: undefined,
      centered: false
    };
  },
  computed: {
    options() {
      return this.spells.map(spell => {
        return { value: spell.name, text: `${spell.symbol} ${spell.name}` };
      });
    }
  },
  watch: {
    selected: function(value) {
      this.$parent.$emit('spellSet', value);
    }
  }
};
</script>

