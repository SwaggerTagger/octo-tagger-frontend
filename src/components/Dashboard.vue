<template>
  <div id="dashboard">
    <md-layout md-gutter>
      <tagging-image
       v-for="image in images"
       :key="image.imageId"
       :image="image"
       />
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
