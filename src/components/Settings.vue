<template>
  <md-dialog md-open-from="#open-settings" md-close-to="#open-settings" ref="settingsDialog">
    <md-dialog-title>Settings</md-dialog-title>
      
    <md-dialog-content>
      <md-subheader>Backend Connectivity</md-subheader>
      <md-divider></md-divider>
      <div class="margin-top">
      <md-switch v-model="useLegacy" class="md-primary">Use Legacy Polling (instead of SSE)</md-switch>
      <label class="label">Polling Interval in seconds: <span class="val-display">{{pollingInterval}} secs</span></label>
        <vue-slider v-model="pollingInterval" tooltip="never" 
              class="slider" :min="3" :max="10" :height="2" :bgStyle="sliderStyle" />
      </div>
      <md-subheader>Functionality</md-subheader>
      <md-divider></md-divider>
        <label class="label">Prediction Confidence Threshold: <span class="val-display">{{predictionConfidence}}%</span></label>
        <vue-slider v-model="predictionConfidence" tooltip="never" 
              class="slider" :min="1" :max="100" :height="2" :bgStyle="sliderStyle" />
        
      <md-subheader>Appearance</md-subheader>
      <md-divider></md-divider>
      <label class="label">Prediction Box Size: <span class="val-display">{{boxWidth}}px</span></label>
      <vue-slider v-model="boxWidth" tooltip="never" 
            class="slider" :min="1" :max="10" :height="2" :bgStyle="sliderStyle" />
      <md-input-container>
        <label>Prediction Font Size: </label>
          <md-select v-model="fontSize">
            <md-option value="xx-large">huge</md-option>
            <md-option value="large">larger</md-option>
            <md-option value="inherit">normal</md-option>
          </md-select>
      </md-input-container>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="close">Cancel</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import vueSlider from 'vue-slider-component'

export default {
  name: 'settings',
  components: { 'vue-slider': vueSlider },
  data() {
    return {
      wrongInterval: false,
      sliderStyle: {
      }
    }
  },
  methods: {
    open() {
      this.$refs.settingsDialog.open()
    },
    close() {
      this.$refs.settingsDialog.close()
    },
  },
  computed: {
    ...mapGetters({ pInterval: 'getPollingInterval', 
    predictionFontSize: 'getPredictionFontSize',
    pConfidence: 'getPredictionConfidence',
    predictionBoxWidth: 'getPredictionBoxWidth',
    useLegacyPoll:'getUseLegacy'}),

    useLegacy: {
      get() {
        return this.useLegacyPoll
      },
      set(value) {
        this.$store.dispatch('setPollingMethod',value)
      }
    },
    pollingInterval: {
      get() {
        return this.pInterval
      },
      set(value) {
          this.$store.dispatch('setPollingInterval', value)
      }
    },
    boxWidth: {
      get() {
        return this.predictionBoxWidth;
      },
      set(value) {
        this.$store.commit('setPredictionBoxWidth', value)
      }
    },
    fontSize: {
      get() {
        return this.predictionFontSize
      }, 
      set(value) {
        this.$store.commit('setPredictionFontSize', value)
      }
    },
    predictionConfidence: {
      get() {
        return this.pConfidence;
      }, 
      set(value) {
        this.$store.commit('setPredictionConfidence', value)
      }
    }
  },
}
</script>
<style>
.val-display {
  background-color: rgba(0,0,0,.54);
  color: white;
  padding: 2px 4px 2px 4px;
  border-radius: 4px;
}
.label {
  color: rgba(0,0,0,.54);
  font-size:12px;
}
.margin-top {
  margin-top:10px;
}
.slider .vue-slider .vue-slider-dot {
  background-color: #3f51b5;
  box-shadow: inherit;
}
.slider .vue-slider .vue-slider-process {
  background-color: #3f51b5;
}
</style>