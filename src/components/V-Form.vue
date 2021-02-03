<template functional>
  <form
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot></slot>
  </form>
</template>
