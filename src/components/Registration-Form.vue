<template>
  <div class="registration">
    <div class="registration__title">
      <h2 class="title">Регистрация</h2>
      <div class="registration__subtitle">
        <span class="text"
          >Уже есть аккаунт? <span class="color--primary">Войти</span></span
        >
      </div>
    </div>
    <V-Form @submit.prevent class="form">
      <V-Input
        v-model.trim="name"
        :error="$v.name.$error"
        @input="delayTouch($v.name)"
        label="Имя"
        placeholder="Имя"
      >
        <template #error>
          <span v-if="!$v.name.required">Поле обязательное к заполнения</span>
          <span v-if="!$v.name.name">Введено некорректное значение</span>
        </template>
      </V-Input>
      <V-Input
        v-model.trim="email"
        :error="$v.email.$error"
        @input="delayTouch($v.email)"
        label="Email"
        placeholder="Email"
      >
        <template #error>
          <span v-if="!$v.email.required">Поле обязательное к заполнения</span>
          <span v-if="!$v.email.email">Введено некорректное значение</span>
        </template>
      </V-Input>
      <V-Input
        v-model.trim="phone"
        :error="$v.phone.$error"
        @input="delayTouch($v.phone)"
        label="Телефон"
        placeholder="Телефон"
      >
        <template #error>
          <span v-if="!$v.phone.required">Поле обязательно для заполнения</span>
          <span v-if="!$v.phone.phone">Введено некорректное значение</span>
        </template>
      </V-Input>
      <V-Select
        v-model="$v.lang.$model"
        :options="langs"
        :error="$v.lang.$error"
        label="Язык"
        placeholder="Язык"
      >
        <template #error>
          <span v-if="!$v.lang.required">Поле обязательно для заполнения</span>
        </template>
      </V-Select>
      <V-Checkbox v-model="$v.agree.$model" :error="$v.lang.$error">
        <span class="form__label">
          Принимаю
          <span class="color--primary">условия</span> использования
        </span>
        <template #error>
          <span v-if="!$v.agree.required">Поле обязательно для заполнения</span>
        </template>
      </V-Checkbox>
      <V-Btn
        :disabled="$v.$invalid"
        @click="setValue()"
        class="btn btn-primary large"
        >Зарегистрироваться</V-Btn
      >
    </V-Form>
  </div>
</template>

<script>
import VForm from '@/components/V-Form.vue';
import VCheckbox from '@/components/Fields/Field-Checkbox.vue';
import VSelect from '@/components/Fields/Field-Select.vue';
import VInput from '@/components/Fields/Field-Text.vue';
import VBtn from '@/components/Controls/V-Btn.vue';
import { required, email } from 'vuelidate/lib/validators';
import { phone, name, requiredBool } from '@/plugin/validators/index';
const touchMap = new WeakMap();
export default {
  name: 'Registration-Form',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      lang: '',
      agree: true,
      langs: ['Англиский', 'Русский', 'Испанский', 'Украина'],
    };
  },
  validations: {
    name: { required, name },
    email: { required, email },
    phone: { required, phone },
    lang: { required },
    agree: { requiredBool },
  },
  components: {
    VBtn,
    VInput,
    VForm,
    VSelect,
    VCheckbox,
  },
  methods: {
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    },
    setValue() {
      if (!this.$v.$invalid) {
        const fields = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          lang: this.lang,
          agree: this.agree,
        };
        this.$emit('input', fields);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.registration {
  max-width: 460px;
  min-width: 300px;
  padding: 40px 30px;
  margin: 10px auto;
  &__title {
    margin-bottom: 50px;
  }
  &__subtitle {
    margin-top: 8px;
    .text {
      color: $dark;
    }
  }
}
.form {
  display: inline-block;
  width: 100%;
}
.btn {
  margin-top: 12px;
}
</style>
