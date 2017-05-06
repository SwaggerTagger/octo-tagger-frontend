<template>
  <div id="app">
    <md-toolbar>
      <!---
      <md-button @click.native="toggleSidenav" class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      -->
      <h2 class="md-title" style="flex: 1">
        <router-link class="yolo-title" to="/">
          <span class="sp-yolo">yolo</span>
          <span class="sp-tagger">tagger</span>
        </router-link>
      </h2>

      <md-button class="md-icon-button" id="open-settings" @click.native="openSettings">
        <md-icon>settings</md-icon>
      </md-button>
    </md-toolbar>
    <!---
    <md-sidenav class="md-left" ref="sidenav">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>
    <md-list>
    <md-list-item><router-link to="settings">Settings</router-link></md-list-item>
    </md-list>
  </md-sidenav>
  -->
    <settings ref="settingsDialog"/>
    <router-view></router-view>
  </div>
</template>

<script>
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
  },
  components: {
    settings: Settings,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Pacifico|VT323');

.sp-yolo {
  font-family: 'Pacifico', cursive;
  font-size:1.3em;
}

.sp-tagger {
  font-family: 'VT323', monospace;
  font-size:1.2em;
}

.yolo-title {
  color:white !important;
}
</style>
