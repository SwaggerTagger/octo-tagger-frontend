<template>
    
      <md-card class="tagging-image-container">
      <md-card-media>
      <aspect-ratio>
      <div class="overlay-container" :style="{ backgroundImage: 'url(' + image.url + ')' }">
        <div class="status-overlay" v-if="!image.classificationDuration" >
          <h3>{{getImageStatus(image)}}</h3>
          <md-progress md-indeterminate></md-progress>
        </div>
        
      </div>
      <img slot="img" src="../assets/aspect_ratio_hack.png"/>
    </aspect-ratio>
    </md-card-media>
      <md-card-header>
        <div class="md-title">{{image.filename}}</div>
        <div class="md-subhead">Uploaded: {{ image.uploadedAt | moment("dddd, MMMM Do YYYY HH:mm") }}</div>
      </md-card-header>
      <md-card-content v-if="image.predictions" class="buffer">
        <div v-for="prediction in image.predictions" class="prediction-chip md-chip md-theme-default" v-on:mouseover="setSelectedPrediction(prediction.predictionId)" v-on:mouseout="setSelectedPrediction(null)" v-bind:class="{'prediction-chip-selected':prediction.predictionId === selectedPredictionId}">
          {{prediction.category}}
        </div>
        <div v-if="image.classificationStart">Tagged: {{ image.classificationStart | moment("dddd, MMMM Do YYYY") }}</div>
        <div v-if="image.classificationDuration">Duration: {{ image.classificationDuration }}</div>
      </md-card-content>
      <div class="buffer"/>
      <md-card-actions>
        <md-button @click.native="deleteSelf">Delete</md-button>
      </md-card-actions>
      
      
    </md-card>
    
</template>

<script>
import { mapActions } from 'vuex'
import { convertToCssPercentage, getImageStatus } from '@/utils/helpers'
import AspectRatio from './AspectRatio'

export default {
  name: 'tagging-image',
  props: {
    image: Object,
  },
  components: { 'aspect-ratio': AspectRatio },
  data: () => ({
    selectedPredictionId: null,
  }),
  methods: {
    ...mapActions(['deleteImage']),
    deleteSelf() {
      this.deleteImage(this.image.imageId)
    },
    setSelectedPrediction(predictionId) {
      this.selectedPredictionId = predictionId
    },
    getImageStatus,
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

.status-overlay {
  position:absolute;
  color:white;
  top:0;
  left:0;
  z-index:3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(86, 86, 86, 0.6);
}
.overlay-container {
  background-repeat: no-repeat;
  background-position: center center;
  background-size:cover;
}

.tagging-image-container {
  margin: 5px;
  display: flex;
  flex-flow: column;
}
.buffer {
  flex: 1;
}
</style>
