<template>
  <div class="page register">
    <form class="register__form" action="#" @submit.prevent="submit">

      <label class="label" for="name">Name</label>

      <input
        id="name"
        type="text"
        class="register__form-input"
        name="name"
        value
        required
        autofocus
        v-model="form.name"
      />

      <label class="label" for="email">Email</label>

      <input
        id="email"
        type="email"
        class="register__form-input"
        name="email"
        value
        required
        autofocus
        v-model="form.email"
      />

      <label class="label" for="password">Password</label>

      <input
        id="password"
        type="password"
        class="register__form-input"
        name="password"
        required
        v-model="form.password"
      />

      <input class="button__primary register__form-button" type="submit" value="Créer un compte"/>

    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { updateProfile, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

interface Form{
  name:string,
  email:string,
  password:string,
}

@Options({
  name: 'Register',
  props: {},
  components: {},
})
export default class Register extends Vue {
  // ***********************************************************************************************
  // PROPS
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------

  // ***********************************************************************************************
  // VARIABLES
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------
  form : Form = {
    name: '',
    email: '',
    password: '',
  };

  error = ''

  db = getFirestore();

  // ***********************************************************************************************
  // FONCTIONS
  // -----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------
  submit(): void {
    createUserWithEmailAndPassword(getAuth(), this.form.email, this.form.password)
      .then(async (data) => {
        await updateProfile(data.user, { displayName: this.form.name });
        await setDoc(doc(this.db, 'Users', data.user.uid), {
          Name: this.form.name,
          IsAdmin: false,
        });
        await this.$router.push('/');
      })
      .catch((err) => {
        this.error = err.message;
      });
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
.register {
  display: flex;
  justify-content: center;
  align-items: center;
}
.register__form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 1rem;
  justify-content: flex-start;
  align-items: flex-end;
}
.register__form-input {
  padding: .5rem;
  border-radius: 15px;
  margin-bottom: 10px;
}
.register__form-button {
  padding: .3rem;
  color: white;
}
// -----------------------------------------------------------------------------------------------
</style>
