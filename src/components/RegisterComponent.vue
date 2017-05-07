<template>
  <video-dialog :title="title" :buttons="loginButtons">
    <div class="md-accent login-failed" v-if="isUnauthorized">register failed.</div>
    <div class="login-ok" v-if="isRegisterSuccessful">{{ registerMessage }}</div>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>Firstname</label>
        <md-input v-model="firstName" required type="text"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Lastname</label>
        <md-input required v-model="lastName" type="text"></md-input>
      </md-input-container>
      <md-input-container>
        <label>E-Mail</label>
        <md-input v-model="email" type="email" required></md-input>
      </md-input-container>
  
      <md-input-container md-has-password>
        <label>Password</label>
        <md-input required v-model="password" type="password"></md-input>
      </md-input-container>
      <md-button @click.native="doRegister" class="md-primary md-raised">Register</md-button>
    </form>
    </md-whiteframe>
  </video-dialog>
</template>

<script>
import VideoDialog from './VideoDialog'
import { mapGetters, mapActions, mapState } from 'vuex'

var formState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
}

var state = {
  ...formState,
  title: "Register",
  loginButtons: [
    {
      text: "login",
      to: "/login",
    },
    {
      text: "cancel",
      to: "/",
    }
  ]
}

export default {
  name: 'register-component',
  data: () => state,
  methods: {
    ...mapActions(['register']),

    doRegister() {
      this.register({ 
        email: state.email, 
        password: state.password,
        firstName: state.firstName, 
        lastName: state.lastName });
    },
  },
  computed: {
    isUnauthorized() {
      return this.registered.reason 
      && this.registered.reason.status == 500;
    },
    isRegisterSuccessful() {
      return this.registered.reason 
      && this.registered.reason.status == 200;
    },
    registerMessage() {
      return this.registered.reason? 
        JSON.parse(this.registered.reason.bodyText).info
        : ""
    },
    ...mapState([
      'registered'
    ])
  },
  components: { VideoDialog }
}
</script>

<style>
.login-failed {
  background: #e91e63;
  padding-left: 15px;
  letter-spacing: 4px;
  font-family: 'VT323', monospace;
  color:black;
}
.login-ok {
  background: darkgreen;
  font-family: 'VT323', monospace;
  width:300px;
  padding: 10px;
  color: white;
}
form {
  width: 300px;
  padding: 10px;
  background-color: white;
}
</style>
