<template>
  <video-dialog :title="title" :buttons="loginButtons">
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>E-Mail</label>
        <md-input type="email" required></md-input>
      </md-input-container>
  
      <md-input-container md-has-password>
        <label>Password</label>
        <md-input required type="password"></md-input>
      </md-input-container>
      <md-button class="md-primary md-raised">Login</md-button>
      <md-switch class="md-accent" v-model="rememberMe" name="remember-me"><i>remember me</i></md-switch>
    </form>
    </md-whiteframe>
  </video-dialog>
</template>

<script>
import VideoDialog from './VideoDialog'

var state = { 
  "rememberMe": true,
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
  data: function () {
    return state;
  },
  components: { VideoDialog }
}
</script>

<style>
form {
  width: 300px;
  padding: 10px;
  background-color: white;
}
</style>
