<template>
  <div class="page login">
    <form class="login__form" action="#" @submit.prevent="submit">
        <label class="label" for="email">Adresse email</label>

          <input
            id="email"
            type="email"
            name="email"
            class="login__form-input"
            required
            autofocus
            v-model="form.email"
          />

        <label class="label" for="password">Mot de passe</label>

          <input
            id="password"
            type="password"
            name="password"
            class="login__form-input"
            required
            v-model="form.password"
          />

      <input class="button__primary login__form-button" @click="google"
             value="Connexion avec Google"/>
      <input class="button__primary login__form-button" type="submit" value="Se connecter"/>
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

  submit():void {
    signInWithEmailAndPassword(getAuth(), this.form.email, this.form.password)
      .then(() => {
        this.$router.replace('/');
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

  // eslint-disable-next-line class-methods-use-this
  async google(): Promise<void> {
    await OtherLogin(LoginMode.Google);
    await this.$router.push('/');
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
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login__form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 1rem;
  justify-content: flex-start;
  align-items: flex-end;
}
.login__form-input {
  padding: .5rem;
  border-radius: 15px;
  margin-bottom: 10px;
}
.login__form-button {
  padding: .3rem;
  color: white;
  margin-bottom: 10px;
}
// -----------------------------------------------------------------------------------------------
</style>
