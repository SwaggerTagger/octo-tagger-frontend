<template>
  <div id="dashboard">
    <md-layout md-gutter>
      <template v-for="image in images">
        <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="25">
          <tagging-image       
          :key="image.imageId"
          :image="image"
          />
        </md-layout>
       </template>
    </md-layout>
      <button @click="reloadImages">Reload</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaggingImage from './TaggingImage'

export default {
  name: 'app',
  computed: mapGetters({
    images: 'getImages',
  }),
  methods: mapActions([
    'reloadImages',
  ]),
  components: {
    'tagging-image': TaggingImage,
  },
}
</script>

<style>
#app {
  padding: 10px;
}
</style>
