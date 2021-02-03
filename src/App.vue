<template>
  <div id="app">
    <Registration-Form @input="fetch($event)"></Registration-Form>
  </div>
</template>

<script>
import RegistrationForm from './components/Registration-Form.vue';

export default {
  name: 'App',
  components: {
    RegistrationForm,
  },
  methods: {
    fetch(fields) {
      console.log(fields);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
