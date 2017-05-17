<template>
  <md-card md-with-hover class="tagging-image-container uploading-file">
    <md-card-media-cover >
    <md-card-media @click.native="openFullScreen">
      <aspect-ratio>
        <div class="overlay-container" :style="{ backgroundImage: 'url(' + file.dataUrl + ')' }">
          <div class="status-overlay">
            <h3>Uploading...</h3>
            <md-progress :md-progress="progress"></md-progress>
          </div>
        </div>
        <img slot="img" src="../assets/aspect_ratio_hack.png" />
      </aspect-ratio>
    </md-card-media>
    <md-card-area class="img-area">
    <md-card-header>
      <div class="md-title break">{{file.file.name}}</div>
      <div class="md-subhead">Size: {{humanFileSize}}</div>
    </md-card-header>
    <div class="buffer" />
    <md-card-actions>
      <md-button @click.native="cancelSelf" :disabled="progress > 95 || !this.file.request">Cancel</md-button>
    </md-card-actions>
    </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
import { mapActions } from 'vuex'
import { humanReadableFileSize } from '@/utils/helpers'
import AspectRatio from './AspectRatio'

export default {
  name: 'uploading-image',
  props: {
    file: Object,
  },
  components: { 'aspect-ratio': AspectRatio },
  methods: {
    cancelSelf() {
      this.cancelUpload(this.file)
    },
    ...mapActions(['cancelUpload']),
  },
  computed: {
    humanFileSize() {
      return humanReadableFileSize(this.file.file.size)
    },
    progress() {
      return Math.round((this.file.progress / this.file.file.size) * 100)
    },
  },
}
</script>

<style>
.uploading-file {
  cursor: initial !important;
}
</style>