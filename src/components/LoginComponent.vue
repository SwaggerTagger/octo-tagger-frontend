<template>
  <video-dialog :title="title" :buttons="loginButtons">
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
import { mapGetters, mapActions } from 'vuex'

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
      console.log("yewp");
      this.login({
        "email": this.$data.email,
        "password": this.$data.password
      });
    },
  }
}
</script>

<style>
form {
  width: 300px;
  padding: 10px;
  background-color: white;
}
</style>
