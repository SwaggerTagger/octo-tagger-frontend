<template>
  <div class="full-screen-component">
    <div class="blur-overlay" @click="closeDialog">
    </div>
      <router-link to="/dashboard">
        <md-button ref="closeLink" class="md-fab md-primary md-fab-top-right top-margin">
          <md-icon class="white">close</md-icon>
        </md-button>
      </router-link>
    <div class="valigner">
      <md-whiteframe @click.native="handleDialogClick" md-elevation="15" class="full-screen-dialog">
        <div 
          class="overlay-container">
          <div class="overlay" 
            :style="overlay.style"
            v-if="overlay.probability >= (predictionConfidence / 100.0)"
            v-for="overlay in predictionOverlays">
            <span>{{overlay.text}}</span>
          </div>
        </div>
        <img class="classified-image" 
          ref="domImage"
          :src="image.url" alt="Classified Image" />
        
      </md-whiteframe>
    </div>
  </div>
</template>

<script>
import { convertToCssPercentage } from '@/utils/helpers'
import { mapGetters } from 'vuex'

export default {
  name: 'fullscreen-image',
  props: {
    image: Object,
  },
  data: () => ({
    selectedPredictionId: null,
  }),
  methods: {
    setSelectedPrediction(predictionId) {
      this.selectedPredictionId = predictionId
    },
    handleDialogClick(event) {
      event.stopPropagation()
    },
    closeDialog() {
      this.$refs.closeLink.$el.click()
    },
  },
  computed: {
    ...mapGetters({
      predictionBoxWidth: 'getPredictionBoxWidth',
      predictionConfidence: 'getPredictionConfidence',
      predictionFontSize: 'getPredictionFontSize'
    }),
    predictionOverlays() {
      if (this.image.predictions === undefined) {
        return []
      }
      const { width, height } = this.image
      return this.image.predictions.map((prediction) => {
        const style = {
          left: convertToCssPercentage(prediction.left / width),
          top: convertToCssPercentage(prediction.top / height),
          width: convertToCssPercentage((prediction.right - prediction.left) / width),
          height: convertToCssPercentage((prediction.bottom - prediction.top) / height),
          'font-size': this.predictionFontSize,
          'border-width': this.predictionBoxWidth + "px"
        }
        const text = `${prediction.category} (${prediction.probability})`
        return { style, text, predictionId: prediction.predictionId, probability: prediction.probability }
      })
    },
  },
}
</script>

<style>
.blur-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 64px;
  z-index: 4;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.5s;
  animation: backdrop 1000ms;
  cursor: pointer;
}

.overlay {
  position: absolute;
  border: 1px solid green;
}

.overlay > span {
  color:white;
  text-shadow: 1px 1px black;
  font-family: 'VT323', monospace;
  margin-left:3px;
}

@keyframes backdrop {
  0% {
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(20px);
  }
  100% {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
}

.valigner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.classified-image {
  max-height: calc(100vh - 150px);
}

div.full-screen-dialog {
  position: fixed;
  z-index: 5;
  background: white;
}

.white {
  color: white;
}

.aligned {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 64px);
}

.top-margin {
  margin-top: 64px !important;
  z-index:250 !important;
}
</style>
