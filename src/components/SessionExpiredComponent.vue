<template>
  <md-dialog ref="sessionExpiredDialog">
    <md-dialog-title>Session Expired</md-dialog-title>
      
    <md-dialog-content>
        <span>Please log in again.</span>
        <login-component />
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="close">Cancel</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import LoginComponent from './LoginComponent'
export default {
  name: 'session-expired',
  mounted() {
      setTimeout( () => this.open(), 0  )
  },
  methods: {
    open() {
      this.$refs.sessionExpiredDialog.open()
    },
    close() {
      this.$refs.sessionExpiredDialog.close()
    },
  },
  components: { LoginComponent }
}
</script>
