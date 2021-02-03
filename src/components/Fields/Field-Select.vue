<template>
  <div class="select form__control" @blur.capture="handleBlur">
    <label :for="uid" class="form__label">{{ label }}</label>
    <div class="select__control">
      <button
        ref="button"
        :id="uid"
        :class="[{ focus: optionsVisible }, 'form__field']"
        @click="toggleOptions"
        @keyup.up.down.prevent="showOptions"
        @keyup.up.prevent="selectPrevOption"
        @keyup.down.prevent="selectNextOption"
        type="button"
      >
        <slot name="selected" :selected="value">
          <span v-if="value" class="select__selection ">{{ value }}</span>
          <span v-else class="form__placeholder">
            {{ placeholder }}
          </span>
        </slot>
        <i class="select__icon"></i>
      </button>
      <ul
        v-show="optionsVisible"
        ref="options"
        tabindex="-1"
        class="select__options"
        @keyup.up.prevent="selectPrevOption()"
        @keyup.down.prevent="selectNextOption()"
        @keydown.up.down.prevent
        @keydown.enter.esc.prevent.stop="reset()"
      >
        <li
          v-for="(option, i) in options"
          :key="`${option}-${i}`"
          :class="activeOptionIndex === i && 'has-focus'"
          class="select__option"
          @click.stop="handleOptionClick(option)"
        >
          <slot name="option" :option="option">
            {{ option }}
          </slot>
        </li>
      </ul>
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
  name: 'FieldSelect',
  mixins: [fieldCounter],
  props: {
    error: Boolean,
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      optionsVisible: false,
      uid: null,
    };
  },
  computed: {
    activeOptionIndex() {
      return this.options.findIndex(
        (x) => x.value === this.value || x === this.value
      );
    },
    prevOptionIndex() {
      const next = this.activeOptionIndex - 1;
      return next >= 0 ? next : this.options.length - 1;
    },
    nextOptionIndex() {
      const next = this.activeOptionIndex + 1;
      return next <= this.options.length - 1 ? next : 0;
    },
  },
  created() {
    this.uid = this._createInput();
  },
  methods: {
    handleOptionClick(option) {
      this.$emit('input', option);
      this.reset();
    },
    handleBlur(e) {
      if (this.$el.contains(e.relatedTarget)) return;
      this.hideOptions();
    },
    toggleOptions() {
      this.optionsVisible ? this.hideOptions() : this.showOptions();
    },
    async showOptions() {
      this.optionsVisible = true;
      await this.$nextTick();
      this.$refs.options.focus();
    },
    hideOptions() {
      this.optionsVisible = false;
    },
    async reset() {
      this.hideOptions();
      await this.$nextTick();
      this.$refs.button.focus();
    },
    selectPrevOption() {
      this.emit('input', this.options[this.prevOptionIndex]);
    },
    selectNextOption() {
      this.$emit('input', this.options[this.nextOptionIndex]);
    },
  },
};
</script>
<style lang="scss">
.select {
  // .select .form__field
  .form__field {
    padding: 16px 10px 16px 16px;
    justify-content: space-between;
  }
  // .select__control
  &__control {
    position: relative;
  }
  // .select__button
  &__button {
    width: 100%;
    display: flex;
  }
  // .select__selection
  &__selection {
    color: $dark;
    font-weight: 500;
    font-size: 1rem;
  }
  // .select__placeholder
  &__placeholder {
    color: $placeholder;
  }
  // .select__icon
  &__icon {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9' fill='none'%3E%3Cpath d='M8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L8.70711 8.70711C8.31658 9.09763 7.68342 9.09763 7.29289 8.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579Z' fill='%230880ae'/%3E%3C/svg%3E");
    width: 16px;
    height: 9px;
  }
  // .select__options
  &__options {
    margin: 0;
    padding: 12px 0 !important;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(calc(100% + 4px));
    width: 100%;
    background-color: #ffffff;
    border: 1px solid $disable;
    border-radius: 6px;
    z-index: 1;
  }
  // .select__option
  &__option {
    cursor: pointer;
    padding: 12px 0 12px 15px;
    font-weight: 500;
    font-style: normal;
    color: $label;
    font-size: 1rem;
    &:hover {
      background-color: $primary-color;
    }
    // .select__option.has-focus
    &.has-focus {
      background-color: $primary-color;
    }
  }
}
</style>
