<template>
  <div id="app">
    <md-toolbar>
        <md-button v-if="isLoggedIn()" @click.native="toggleSidenav" class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
      <h2 class="md-title" style="flex: 1">
          <router-link class="yolo-title" to="/">
            <span class="sp-yolo">yolo</span>
            <span class="sp-tagger">tagger</span>
          </router-link>
        </h2>
  
      <md-button class="md-icon-button" @click.native="doLogout">
        <md-icon>exit_to_app</md-icon>
        <md-tooltip md-delay="400" md-direction="bottom">Logout</md-tooltip>
      </md-button>
      <md-button class="md-icon-button" id="open-settings" @click.native="openSettings">
        <md-icon>settings</md-icon>
        <md-tooltip md-delay="400" md-direction="bottom">Settings</md-tooltip>
      </md-button>
    </md-toolbar>
      <md-sidenav class="md-left" ref="sidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h2 class="md-title" style="flex: 1">
            <router-link class="yolo-title" to="/">
              <span class="sp-yolo">yolo</span>
              <span class="sp-tagger">tagger</span>
            </router-link>
          </h2>
        </div>
          <p class="p-welcome" v-if="getLogin()">
            Welcome, {{prettyName}}
          </p>
      </md-toolbar>
      <md-list>
        <md-subheader>Navigation</md-subheader>
        <md-list-item><router-link to="/dashboard"><md-icon>dashboard</md-icon><p>Dashboard</p></router-link></md-list-item>
        <md-list-item><router-link to="/billing"><md-icon>monetization_on</md-icon><p>Billing</p></router-link></md-list-item>
        <md-list-item><router-link to="/about"><md-icon>info</md-icon><p>About</p></router-link></md-list-item>
        <md-subheader>Login</md-subheader>
        <md-list-item><router-link to="/login"><md-icon>exit_to_app</md-icon><p>Login</p></router-link></md-list-item>
        <md-list-item><router-link to="/register"><md-icon>blur_circular</md-icon><p>Register</p></router-link></md-list-item>
      </md-list>
    </md-sidenav>
    <settings ref="settingsDialog" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Settings from './Settings'

export default {
  name: 'app',
  methods: {
    toggleSidenav() {
      this.$refs.sidenav.toggle()
    },
    openSettings() {
      this.$refs.settingsDialog.open()
    },
    doLogout() {
      this.logout()
      this.$router.push('/login')
    },
    async redirect() {
      if (this.isLoggedIn()) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    },
    ...mapActions(['logout']), 
    ...mapGetters(['isLoggedIn', 'getLogin']),
  },
  computed: {
    prettyName() {
      return this.getLogin().body.fullName;
    }
  },
  mounted() {
    this.redirect()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.redirect())
  },
  updated() {
    if (this.$route.path === '/') {
      this.redirect()
    }
  },
  components: {
    settings: Settings,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Pacifico|VT323');

.p-welcome {
  margin-left: 7px;
}

.sp-yolo {
  font-family: 'Pacifico', cursive;
  font-size: 1.3em;
}

.sp-tagger {
  font-family: 'VT323', monospace;
  font-size: 1.2em;
}

.yolo-title {
  color: white !important;
}
</style>
