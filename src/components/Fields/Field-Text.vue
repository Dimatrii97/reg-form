<template>
  <div :class="['form__control']">
    <div>
      <label class="form__label" v-if="label" :for="uid">{{ label }}</label>
      <input
        v-model="setValue"
        v-bind="{ ...$attrs, type, id: uid }"
        v-on="listeners"
        class="form__field"
      />
    </div>
    <div class="form__field-deteils">
      <div v-show="error" class="form__field-error">
        <slot name="error"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import fieldCounter from '@/plugin/mixins/field-counter-global.js';

export default {
  mixins: [fieldCounter],
  props: {
    label: String,
    id: String,
    error: Boolean,
    value: {
      default: '',
      type: String,
    },
    type: {
      default: 'text',
      type: String,
    },
  },
  data() {
    return {
      uid: null,
    };
  },
  computed: {
    setValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    listeners() {
      // eslint-disable-next-line no-unused-vars
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
  },
  created() {
    if (this.id) {
      this.uid = this.id;
    } else {
      this.uid = this._createInput();
    }
  },
};
</script>
