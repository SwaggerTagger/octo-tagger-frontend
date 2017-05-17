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
      <md-input-container v-if="onDashboard" class="tag-search">
        <md-icon>
          filter_list
        </md-icon>
        <label>filter by tag..</label>
        <md-input :value="filterText" @input="updateFilter" type="text"></md-input>
      </md-input-container>
  
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
        <md-list-item>
          <router-link to="/dashboard">
            <md-icon>dashboard</md-icon>
            <p>Dashboard</p>
          </router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/billing">
            <md-icon>monetization_on</md-icon>
            <p>Billing</p>
          </router-link>
        </md-list-item>
        <md-list-item href="https://swaggertagger.github.io/impress.js">
          <!---<router-link to="/about">
            <md-icon>info</md-icon>
            <p>About</p>
          </router-link>-->
          <p>About</p>
        </md-list-item>
        <md-subheader>Login</md-subheader>
        <md-list-item>
          <router-link to="/login">
            <md-icon>exit_to_app</md-icon>
            <p>Login</p>
          </router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/register">
            <md-icon>blur_circular</md-icon>
            <p>Register</p>
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
    <settings ref="settingsDialog" />
    <session-expired v-if="$store.state.loggedIn.sessionExpired" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Settings from './Settings'
import SessionExpired from './SessionExpiredComponent'

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
    updateFilter(e) {
      this.$store.commit('updateFilter', e)
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
      return this.getLogin().body.fullName
    },

    onDashboard() {
      return this.$route.name === 'Dashboard' || this.$route.name === 'FullScreenComponent'
    },

    ...mapState({
      filterText: state => state.filterText,
    }),

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
    sessionExpired: SessionExpired,
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

.tag-search {
  width: initial;
  min-width: 200px;
}
</style>
