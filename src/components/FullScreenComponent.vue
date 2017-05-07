<template>
  <div class="full-screen-component">
    <div class="blur-overlay">
    </div>
    <div class="valigner">
      <md-whiteframe md-elevation="15" class="full-screen-dialog">
        <router-link to="/dashboard">
          <md-button class="md-fab md-accent md-fab-top-right">
            <md-icon class="white">close</md-icon>
          </md-button>
        </router-link>
        <div 
          class="overlay-container">
          <div class="overlay" 
            :style="overlay.style"
            v-for="overlay in predictionOverlays">
            <span>{{overlay.text}}</span>
          </div>
        </div>
        <img class="classified-image" 
          ref="domImage"
          :src="image.url" alt="Classified Image" />
        <div class="aligned-item tags">
          <md-chip v-on:mouseover="setSelectedPrediction(prediction.predictionId)" 
          v-on:mouseout="setSelectedPrediction(null)" 
          v-bind:class="{'prediction-chip-selected': prediction.predictionId === selectedPredictionId}" 
          v-for="prediction in image.predictions" class="prediction-chip">
            {{prediction.category}}
          </md-chip>
        </div>
      </md-whiteframe>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { convertToCssPercentage, getImageStatus } from '@/utils/helpers'

export default {
  name: 'fullscreen-image',
  props: {
    image: Object
  },
  data: () => ({
    selectedPredictionId: null,
  }),
  methods: {
    setSelectedPrediction(predictionId) {
      this.selectedPredictionId = predictionId
    },
  },
  mounted() {
    console.log(this)
  },
  computed: {
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
        }
        const text = `${prediction.category} (${prediction.probability})`
        return { style, text, predictionId: prediction.predictionId }
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
  z-index: 90;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.5s;
  animation: backdrop 1000ms;
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
  z-index: 100;
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
</style>
