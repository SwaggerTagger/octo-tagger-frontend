<template>
  <md-dialog md-open-from="#open-settings" md-close-to="#open-settings" ref="settingsDialog">
    <md-dialog-title>Settings</md-dialog-title>
      
    <md-dialog-content>
      <md-input-container>
        <label>Polling Interval in seconds:</label>
        <md-input v-model="pollingInterval" type="number"/>
      </md-input-container>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="close">Cancel</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'settings',
  methods: {
    open() {
      this.$refs.settingsDialog.open()
    },
    close() {
      this.$refs.settingsDialog.close()
    },
  },
  computed: {
    ...mapGetters({ pInterval: 'getPollingInterval' }),
    pollingInterval: {
      get() {
        return this.pInterval
      },
      set(value) {
        this.$store.commit('setPollingInterval', value)
      },
    },
  },
}
</script>
