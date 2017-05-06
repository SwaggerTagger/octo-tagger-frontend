<template>
  <div id="dashboard">
    <router-view></router-view>
    <md-layout md-gutter>
      <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="25">
        <upload-card/>
      </md-layout>
      <template v-for="image in images">
        <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="25">
          <tagging-image       
          :key="image.imageId"
          :image="image"
          />
        </md-layout>
       </template>
    </md-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaggingImage from './TaggingImage'
import UploadCard from './UploadCard'

export default {
  name: 'dashboard',
  computed: mapGetters({
    images: 'getImages',
  }),
  methods: mapActions([
    'startPolling',
  ]),
  components: {
    'tagging-image': TaggingImage,
    UploadCard,
  },
  mounted() {
    this.startPolling()
  },
}
</script>

<style>
#dashboard {
  padding: 10px;
}
.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}
.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
  animation: fa-spin 1s infinite steps(8);
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
</style>
