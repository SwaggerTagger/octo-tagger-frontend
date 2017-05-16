<template>
  <md-card md-with-hover class="tagging-image-container" @click.native="openFullScreen">
    <md-card-media-cover >
    <md-card-media>
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
      <div class="md-title break">{{image.filename}}</div>
      <div class="md-subhead">Uploaded: {{ image.uploadedAt | moment("dddd, MMMM Do YYYY HH:mm") }}</div>
      <div v-if="image.classificationStart">Classification started: {{ image.classificationStart | moment("dddd, MMMM Do YYYY  HH:mm") }}</div>
      <div v-if="image.classificationDuration">Duration: {{ image.classificationDuration / 1000 }}s</div>
    </md-card-header>
    <div v-if="image.predictions" class="buffer">
      <div v-for="prediction in group(image.predictions)" class="prediction-chip md-chip md-theme-default">
        <template v-if="filterApplied">
          <span class="markings">{{filterMatchPart(prediction.category)}}</span><span>{{filterRest(prediction.category)}}</span>
        </template>
        <template v-else>
          {{prediction.category}}
        </template>
      </div>
    </div>
    <div class="buffer" />
    <md-card-actions>
      <md-button @click.native="deleteSelf">Delete</md-button>
    </md-card-actions>
    </md-card-area>
  
    </md-card-media-cover>
  </md-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getImageStatus } from '@/utils/helpers'
import AspectRatio from './AspectRatio'

export default {
  name: 'tagging-image',
  props: {
    image: Object,
  },
  components: { 'aspect-ratio': AspectRatio },
  methods: {
    ...mapActions(['deleteImage']),
    ...mapGetters(['getFilterText']),
    deleteSelf(event) {
      event.stopPropagation()
      this.deleteImage(this.image.imageId)
    },
    openFullScreen() {
      this.$router.push({ name: 'FullScreenComponent',
        params: { image: this.image, id: this.image.imageId } })
    },
    group(predictions) {
      let grouped = {},
        shown = []
      predictions.forEach((p) => {
        if (p.category in grouped) {
          grouped[p.category] += 1
        } else {
          grouped[p.category] = 1
        }
      })
      for (const name in grouped) {
        shown.push({ category: grouped[name] === 1 ? name : `${name} x${grouped[name]}` })
      }
      return shown
    },
    filterMatchPart(tag) {
      const f = this.getFilterText()
      const p = tag.startsWith(f) ? tag.slice(0, f.length) : ''
      return p
    },
    filterRest(tag) {
      const f = this.getFilterText()
      return tag.startsWith(f) ? tag.slice(f.length) : tag
    },
    getImageStatus,
  },
  computed: {
    filterApplied() {
      return this.$store.state.filterText !== ''
    },
  },
}
</script>

<style>
.markings {
  background-color:orangered;
  
}
.break {
  word-wrap: break-word;
}
.img-area {
  background: rgba(0, 0,0,0.3);
  font-family: 'VT323', monospace;
}
.prediction-chip {
  background-color: #3f51b5 !important;
  opacity: 0.8;
  margin-left: 2px;
}
.status-overlay {
  position: absolute;
  color: white;
  top: 0;
  left: 0;
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
