let inputCounter = 0;

export default {
  methods: {
    _createInput() {
      return 'input-' + inputCounter++;
    },
  },
};
