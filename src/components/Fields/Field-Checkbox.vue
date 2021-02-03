<template>
  <div class="form__control">
    <label class="check " :for="uid">
      <input
        v-model="setValue"
        v-bind="$attrs"
        class="check__input"
        type="checkbox"
        :id="uid"
      />
      <span class="check__box"></span>
      <span class="check__text">
        <slot></slot>
      </span>
    </label>
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
  props: {
    value: Boolean,
    error: Boolean,
  },
  mixins: [fieldCounter],
  data() {
    return {
      uid: '',
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
  },
  created() {
    this.uid = this._createInput();
  },
};
</script>

<style lang="scss" scoped>
.check {
  padding: 4px 0 4px 36px;
  display: block;
  position: relative;
  // .check__input
  &__input {
    position: absolute;
    appearance: none;
  }
  // .check__box
  &__box {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    margin-left: -36px;
    border-radius: 4px;
    border: 1px solid $disable;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    cursor: pointer;
  }
  // .check__input:checked + .check__box
  &__input:checked + &__box {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12' viewBox='0 0 16 12' fill='none'%3E%3Cpath d='M14.6343 0.634339C14.9467 0.32192 15.4533 0.32192 15.7657 0.634339C16.0781 0.946758 16.0781 1.45329 15.7657 1.76571L6.16569 11.3657C5.85327 11.6781 5.34674 11.6781 5.03432 11.3657L1.03432 7.36571C0.721898 7.05329 0.721898 6.54676 1.03432 6.23434C1.34674 5.92192 1.85327 5.92192 2.16569 6.23434L5.6 9.66865L14.6343 0.634339Z' fill='%230880ae'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04), 0 0 0 2px $primary;
  }
  // не указано какой цвет при фокусе по этому сделал для выделения другой оттенок
  // .check__input:focus + .check__box
  &__input:focus + &__box {
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04), 0 0 0 2px $primary;
  }
  // .check__input:checked:focus + .check__box
  &__input:checked:focus + &__box {
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04), 0 0 0 2px #53aed3;
  }
  // .check__input:disabled + .check__box
  &__input:disabled + &__box {
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04), 0 0 0 2px $disable;
    cursor: not-allowed;
  }
}
</style>
