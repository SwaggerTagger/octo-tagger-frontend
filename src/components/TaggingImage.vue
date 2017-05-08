<template>
  <md-card md-with-hover class="tagging-image-container">
    <md-card-media-cover >
    <md-card-media @click.native="openFullScreen">
      <aspect-ratio>
        <div class="overlay-container" :style="{ backgroundImage: 'url(' + image.url + ')' }">
          <div class="status-overlay" v-if="!image.classificationDuration">
            <h3>{{getImageStatus(image)}}</h3>
            <md-progress md-indeterminate></md-progress>
          </div>
  
        </div>
        <img slot="img" src="../assets/aspect_ratio_hack.png" />
      </aspect-ratio>
    </md-card-media>
    <md-card-area class="img-area">
    <md-card-header>
      <div class="md-title">{{image.filename}}</div>
      <div class="md-subhead">Uploaded: {{ image.uploadedAt | moment("dddd, MMMM Do YYYY HH:mm") }}</div>
      <div v-if="image.classificationStart">Tagged: {{ image.classificationStart | moment("dddd, MMMM Do YYYY") }}</div>
      <div v-if="image.classificationDuration">Duration: {{ image.classificationDuration }}</div>
    </md-card-header>
    <md-card-content v-if="image.predictions" class="buffer">
      <div v-for="prediction in image.predictions" class="prediction-chip md-chip md-theme-default">
        {{prediction.category}}
      </div>
    </md-card-content>
    <div class="buffer" />
    <md-card-actions>
      <md-button @click.native="deleteSelf">Delete</md-button>
    </md-card-actions>
    </md-card-area>
  
    </md-card-media-cover>
  </md-card>
</template>

<script>
import { mapActions } from 'vuex'
import AspectRatio from './AspectRatio'
import { getImageStatus } from '@/utils/helpers'

export default {
  name: 'tagging-image',
  props: {
    image: Object,
  },
  components: { 'aspect-ratio': AspectRatio },
  methods: {
    ...mapActions(['deleteImage']),
    deleteSelf() {
      this.deleteImage(this.image.imageId)
    },
    openFullScreen() {
      this.$router.push({ name: 'FullScreenComponent',
        params: { image: this.image, id: this.image.imageId } })
    },
    getImageStatus,
  },
}
</script>

<style>
.img-area {
  background: rgba(0, 0,0,0.3);
  font-family: 'VT323', monospace;
}
.prediction-chip {
  background-color: #3f51b5 !important;
  opacity: 0.8;
}
.status-overlay {
  position: absolute;
  color: white;
  top: 0;
  left: 0;
  z-index: 3;
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
  background-size: cover;
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
