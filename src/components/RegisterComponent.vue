<template>
  <video-dialog :title="title" :buttons="loginButtons">
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>Firstname</label>
        <md-input required type="text"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Lastname</label>
        <md-input required type="text"></md-input>
      </md-input-container>
      <md-input-container>
        <label>E-Mail</label>
        <md-input type="email" required></md-input>
      </md-input-container>

      <md-input-container md-has-password>
        <label>Password</label>
        <md-input required type="password"></md-input>
      </md-input-container>
      <md-button class="md-primary md-raised">Register</md-button>
    </form>
    </md-whiteframe>
  </video-dialog>
</template>

<script>
import VideoDialog from './VideoDialog'

var state = { 
  "rememberMe": true,
  "title": "Register",
  "loginButtons": [
    {
      "text": "login",
      "to": "/login"
    },
    {
      "text": "cancel",
      "to": "/"
    }
  ]
}

export default {
  name: 'register-component',
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
