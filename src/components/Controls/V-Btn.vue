<template functional>
  <button
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  margin-bottom: 0;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 16px 65px;
  font-size: 1rem;
  border-radius: 6px;
  color: #3a3a3a;
  background-color: #fff;
  border-color: #dcdee2;

  &:disabled {
    background-color: $disable;
    color: $dark;
  }
  &:active,
  &:focus {
    box-shadow: 0px 0px 0px 2px $btn-active inset;
  }
}
.large {
  width: 100%;
  padding: 16px 5px;
}
.btn-primary {
  background-color: $primary;
  color: $primary-color;
}
.warning {
  background-color: $warning;
  color: $warning-color;
}
.error {
  background-color: $error;
  color: $error-color;
}

.btn-large {
  padding: 20px 75px;
  font-size: 1.2rem;
}
.btn-small {
  padding: 14px 35px;
  font-size: 0.8rem;
}
</style>
