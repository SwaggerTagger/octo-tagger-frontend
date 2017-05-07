<template>
  <md-dialog md-open-from="#open-settings" md-close-to="#open-settings" ref="settingsDialog">
    <md-dialog-title>Settings</md-dialog-title>
      
    <md-dialog-content>
      <md-input-container v-bind:class="{'md-input-invalid':wrongInterval}">
        <label>Polling Interval in seconds:</label>
        <md-input v-model="pollingInterval" type="number"/>
        <span v-if="wrongInterval" class="md-error">Value must be between 1 and 10000</span>
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
  data() {
    return {
      wrongInterval: false,
    }
  },
  methods: {
    open() {
      this.$refs.settingsDialog.open()
      this.$forceUpdate()
    },
    close() {
      this.$refs.settingsDialog.close()
    },
    isPIntervalvalid(value = this.pollingInterval) {
      return value > 0 && value < 10000
    },
  },
  computed: {
    ...mapGetters({ pInterval: 'getPollingInterval' }),
    pollingInterval: {
      get() {
        return this.pInterval
      },
      set(value) {
        this.wrongInterval = !this.isPIntervalvalid(value)
        if (this.isPIntervalvalid(value)) {
          this.$store.dispatch('setPollingInterval', value)
        }
      },
    },
  },
}
</script>
