<template>
  <video-dialog :title="title" :buttons="loginButtons">
    <div class="md-accent login-failed" v-if="isUnauthorized">login failed.</div>
    <div class="md-accent login-failed" v-if="isPreconditionFailed">validate your email!!</div>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>E-Mail</label>
        <md-input v-model="email" type="email" required></md-input>
      </md-input-container>
  
      <md-input-container md-has-password>
        <label>Password</label>
        <md-input v-model="password" required type="password"></md-input>
      </md-input-container>
      <md-button @click.native="doLogin" 
        class="md-primary md-raised">Login</md-button>
      <md-switch class="md-accent" v-model="rememberMe" name="remember-me"><i>remember me</i></md-switch>
    </form>
    </md-whiteframe>
  </video-dialog>
</template>

<script>
import VideoDialog from './VideoDialog'
import { mapGetters, mapActions, mapState } from 'vuex'

var formState = { 
  "rememberMe": true,
  "email": "",
  "password": "",
  "title": "Login",
  "loginButtons": [
    {
      "text": "register",
      "to": "/register"
    },
    {
      "text": "cancel",
      "to": "/"
    }
  ]
}

export default {
  name: 'login-component',
  components: { VideoDialog },
  data: () => formState,
  methods: {
    ...mapActions([ 'login' ]),

    doLogin() {
      this.login({
        "email": formState.email,
        "password": formState.password
      })
    },
  },
  computed: {
    isUnauthorized() {
      return this.loggedIn.reason 
      && this.loggedIn.reason.status == 401;
    },
    isPreconditionFailed() {
      return this.loggedIn.reason 
      && this.loggedIn.reason.status == 412;
    },
    ...mapState([
      'loggedIn'
    ])
  }
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
form {
  width: 300px;
  padding: 10px;
  background-color: white;
}
</style>
