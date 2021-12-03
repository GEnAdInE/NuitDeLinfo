<template>
  <div>
    <form action="#" @submit.prevent="submit">
        <label for="email">Email</label>

          <input
            id="email"
            type="email"
            class="form-control"
            name="email"
            value
            required
            autofocus
            v-model="form.email"
          />

        <label for="password">Password</label>

          <input
            id="password"
            type="password"
            class="form-control"
            name="password"
            required
            v-model="form.password"
          />

      <button @click="Basic">Basic Login</button>
      <button @click="Google">Login With google</button>

    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginMode, OtherLogin } from '@/utils/FirebaseInterface';

interface Form{
  email:string,
  password:string,
}

@Options({
  name: 'Login',
  props: {},
  components: {},
})
export default class Login extends Vue {
  // ***********************************************************************************************
  // PROPS
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------
  form : Form = {
    email: '',
    password: '',
  };

  error = ''

  // ***********************************************************************************************
  // VARIABLES
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------

  // ***********************************************************************************************
  // FONCTIONS
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------
  Basic() {
    this.submit(LoginMode.Basic);
  }

  Google() {
    this.submit(LoginMode.Google);
  }

  submit(types : LoginMode) {
    if (LoginMode.Basic === types) {
      signInWithEmailAndPassword(getAuth(), this.form.email, this.form.password)
        .then(() => {
          this.$router.replace('/');
        })
        .catch((err) => {
          this.error = err.message;
        });
    } else {
      OtherLogin(types);
    }
  }
}
</script>

<style lang="scss" scoped>
// ***********************************************************************************************
// KEYFRAMES
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// ***********************************************************************************************
// TAGS
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

// ***********************************************************************************************
// CLASSES
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
</style>
