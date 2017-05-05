<template>
  <md-card md-with-hover class="tagging-image-container">
    

    <md-card-header>
      <div class="md-title">Title goes here</div>
      <div class="md-subhead">Uploaded: {{ image.uploadedAt | moment("dddd, MMMM Do YYYY HH:mm") }}</div>
    </md-card-header>
    <md-card-actions>
      <md-button>Delete</md-button>
    </md-card-actions>
    <md-card-content>
      <div v-for="prediction in image.predictions" class="prediction-chip md-chip md-theme-default" v-on:mouseover="setSelectedPrediction(prediction.predictionId)" v-on:mouseout="setSelectedPrediction(null)" v-bind:class="{'prediction-chip-selected':prediction.predictionId === selectedPredictionId}">
        {{prediction.category}}
      </div>
      <div v-if="image.classificationStart">Tagged: {{ image.classificationStart | moment("dddd, MMMM Do YYYY") }}</div>
      <div v-if="image.classificationDuration">Duration: {{ image.classificationDuration }}</div>
    </md-card-content>
    <md-card-media class="overlay-container">
      <md-image :md-src="image.url"></md-image>
      <div v-for="pred in predictionOverlays" class="pred-overlay" v-bind:style="pred.style" v-on:mouseover="setSelectedPrediction(pred.predictionId)" v-on:mouseout="setSelectedPrediction(null)" v-bind:class="{'pred-overlay-selected':pred.predictionId === selectedPredictionId}">{{pred.text}}</div>
    </md-card-media>
    
    
    

  </md-card>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import { convertToCssPercentage } from '@/utils/helpers'

export default {
  name: 'tagging-image',
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
.pred-overlay {
  position:absolute;
  z-index:3;
  color: green;
  white-space: nowrap;
  overflow-x: visible;
  border: green;
  border-style: solid;
  opacity: 0.4;
}
.pred-overlay-selected {
  opacity: 1;
}
.overlay-container {
  z-index:1;
}
.prediction-chip:hover, .prediction-chip-selected {
    cursor: pointer;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
}
.tagging-image-container {
  margin: 5px;
}
</style>
