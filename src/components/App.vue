<template>
  <div id="app">
    <md-toolbar>
      <!---
      <md-button @click.native="toggleSidenav" class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      -->
      <h2 class="md-title" style="flex: 1">Octo-Tagger</h2>

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

</style>
