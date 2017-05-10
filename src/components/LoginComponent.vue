<template>
  <video-dialog :title="title" :buttons="loginButtons">
    <transition name="component-fade" mode="out-in">
      <div class="md-accent login-ok" v-if="isAlreadyLoggedIn">You are logged in as {{$store.state.loggedIn.reason.body.fullName}}. 
        <md-button @click.native="logout" class="md-raised md-primary">Logout</md-button></div>
      <div class="md-accent login-failed" v-if="isUnauthorized">login failed.</div>
      <div class="md-accent login-failed" v-if="isPreconditionFailed">validate your email!!</div>
      <router-view></router-view>
    </transition>
    <form @keyup.enter="doLogin" novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>E-Mail</label>
        <md-input v-model="email" type="email" required></md-input>
      </md-input-container>
  
      <md-input-container md-has-password>
        <label>Password</label>
        <md-input v-model="password" required type="password"></md-input>
      </md-input-container>
      <md-button @click.native="doLogin" :disabled="isAlreadyLoggedIn"
        class="md-primary md-raised">Login</md-button>
      <md-switch class="md-accent" v-model="rememberMe" name="remember-me"><i>remember me</i></md-switch>
    </form>
    </md-whiteframe>
  </video-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VideoDialog from './VideoDialog'

const formState = {
  rememberMe: true,
  email: '',
  password: '',
  title: 'Login',
  loginButtons: [
    {
      text: 'register',
      to: '/register',
    },
    {
      text: 'cancel',
      to: '/',
    },
  ],
}

export default {
  name: 'login-component',
  components: { VideoDialog },
  data: () => formState,
  methods: {
    ...mapActions(['login', 'logout']),

    async doLogin() {
      if (await this.login({
        email: formState.email,
        password: formState.password,
      })) {
        this.$router.push('/dashboard')
      }
    },
  },
  computed: {
    isUnauthorized() {
      return this.loggedIn.reason
      && (
        this.loggedIn.reason.status === 401
        || this.loggedIn.reason.status === 403)
    },
    isPreconditionFailed() {
      return this.loggedIn.reason
      && this.loggedIn.reason.status === 412
    },
    isAlreadyLoggedIn() {
      return this.loggedIn.is
    },
    ...mapState([
      'loggedIn',
    ]),
  },
}
</script>

<style scoped>
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

.blue {
  color: turquoise !important;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}
</style>
