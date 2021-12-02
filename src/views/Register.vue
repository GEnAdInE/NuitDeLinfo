<template>
  <div>
    <form action="#" @submit.prevent="submit">

      <label for="name">Name</label>

      <input
        id="name"
        type="name"
        class="form-control"
        name="name"
        value
        required
        autofocus
        v-model="form.name"
      />

      <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

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

      <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

      <input
        id="password"
        type="password"
        class="form-control"
        name="password"
        required
        v-model="form.password"
      />

      <button type="submit" class="btn btn-primary">Login</button>

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
  submit() {
    createUserWithEmailAndPassword(getAuth(), this.form.email, this.form.password)
      .then(async (data) => {
        await updateProfile(data.user, { displayName: this.form.name });
        await setDoc(doc(this.db, 'Users', data.user.uid), {
          Name: this.form.name,
          IsAdmin: false,
        });
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
// -----------------------------------------------------------------------------------------------
</style>
